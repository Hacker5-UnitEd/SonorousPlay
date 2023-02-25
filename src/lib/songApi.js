export async function init() {
    const node = await Ipfs.create()
    await node.bootstrap.add("/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star")
    await node.bootstrap.add("/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star")
    return node
}

// export async function getUrl(node, path) {
//     if(path.slice(0, 6) != '/ipfs/') {
//         let chunks = [];
//         // console.log("IPFS download starting");
//         // let i=0;
//         for await (const chunk of node.files.read(path)) {
//           chunks = chunks.concat(chunk);
//         //   console.log(i++);
//         }
//         // console.log('Download complete')
//         const audblob = new Blob(chunks);
//         return window.URL.createObjectURL(audblob);
//     } else {
//         return 'https://dweb.link'+path
//     }
// }

export async function getUrl(node, path) {
    const hash=(await node.files.stat(path)).cid.toString()
    let chunks = [];
    for await (const chunk of node.cat(hash)) {
      chunks = chunks.concat(chunk);
    }
    const audblob = new Blob(chunks);
    return window.URL.createObjectURL(audblob);
} 

export async function getList(node) {
    let songList = []
    let albumList = {}
    let artistList = {}
    for await (const artist of node.files.ls("/")) {
            let song = {artist: artist.name}
            artistList[artist.name] = 'No Image'
            for await (const album of node.files.ls("/"+artist.name)) {
                if(album.name=='artistArt') {
                    artistList[artist.name]="/"+artist.name+"/"+'artistArt'
                } else {
                    song.album = album.name
                    albumList[album.name]='No Image'
                    for await (const aud of node.files.ls("/"+artist.name+"/"+album.name)) {
                        if(aud.name != 'albumArt') {
                            song.name=aud.name
                            song.path="/"+artist.name+"/"+album.name+"/"+aud.name
							console.log(song)
                            songList.push(JSON.parse(JSON.stringify(song)))
                            console.log(songList)
                        } else {
                            albumList[album.name]="/"+artist.name+"/"+album.name+"/"+aud.name
                        }
                    }
                }
            }
    }
    console.log(albumList);

    return [albumList, songList];
}

export function addSong(node, file, jsmediatags) {
    return new Promise((resolve, reject) => {
        jsmediatags.read(file, {
        onSuccess: async (tag) => {
            const albumName=(tag.tags.album || "Unknown Album")
            const artistName=(tag.tags.artist || "Unknown Artist")
            const songName=(tag.tags.title || file.name)
			
            await node.files.write(`/${artistName}/${albumName}/${songName}`, new Uint8Array(await file.arrayBuffer()), {create: true, parents: true})
            if(tag.tags.picture) {
                const { data, format } = tag.tags.picture;
                await node.files.write(`/${artistName}/${albumName}/albumArt`, data, {create: true, parents: true});
                resolve([ 
					`/${artistName}/${albumName}/albumArt`, 
                    {name: songName, album: albumName, artist: artistName, path: `/${artistName}/${albumName}/${songName}`}
                ])
            }
        },
        onError: (error) => {
            reject(error)
        }
    })
    
    })
}

export async function getListFromHash(node, hash) {
    let songList = []
    let albumList = {}
    let artistList = {}
    for await (const artist of node.ls(hash)) {
            let song = {artist: artist.name}
            artistList[artist.name] = 'No Image'
            for await (const album of node.ls(hash+"/"+artist.name)) {
                if(album.name=='artistArt') {
                    artistList[artist.name]='/ipfs/'+hash+"/"+artist.name+"/"+'artistArt'
                } else {
                    song.album = album.name
                    albumList[album.name]='No Image'
                    for await (const aud of node.ls(hash+"/"+artist.name+"/"+album.name)) {
                        if(aud.name != 'albumArt') {
                            song.name=aud.name
                            song.path='/ipfs/'+hash+"/"+artist.name+"/"+album.name+"/"+aud.name
							console.log(song)
                            songList.push(JSON.parse(JSON.stringify(song)))
                            console.log(songList)
                        } else {
                            albumList[album.name]='/ipfs/'+hash+"/"+artist.name+"/"+album.name+"/"+aud.name
                        }
                    }
                }
            }
    }
    console.log(albumList);

    return [albumList, songList];
}

export async function getHashLocal(node) {
    return (await node.files.stat('/')).cid.toString()
}

export async function delSong(node, path) {
    node.files.rm(path, { flush: true })
}

export async function addRemoteSong(node, path) {
    let mpath = path.split('/')
    mpath.splice(1,2)
    node.files.cp(path, mpath.join('/'))
}