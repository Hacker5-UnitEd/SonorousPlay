function getRandomGateway() {
    const gwArr = [
        "dweb.link",
        "cf-ipfs.com",
        "ipfs.io",
        "fleek.ipfs.io",
        "4everland.io",
        "nftstorage.link",
        "w3s.link",
        // "ipfs.joaoleitao.org",
        "ipfs.eth.aragon.network",
        "ipfs.best-practice.se",
        // "cloudflare-ipfs.com",
        "gateway.ipfs.io",
      ];

      return gwArr[Math.floor(Math.random() * gwArr.length)]
}

async function gatewayListHash(hash) {
    console.log(hash)
    const list=[]
    const randGateway = getRandomGateway();
    const resp = await fetch(`https://${ randGateway }/ipfs/${hash}`)
    const respText = await resp.text()
    const docParser = new DOMParser();
    const doc = docParser.parseFromString(respText, 'text/html')
    console.log(doc.querySelector('tbody').children)
    const tbodyChildren = doc.querySelector('tbody').children
    for (let i = ( hash.includes("/") ? 1 : 0  ); i < tbodyChildren.length; i++) {
      let tr = tbodyChildren[i];
      const arr=tr.children[1].children[0].href.split('/')
      list.push(decodeURI(arr[arr.length-1]))
    }

    return list
}

export async function init() {
  const node = await Ipfs.create();
  await node.bootstrap.add(
    "/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star"
  );
  await node.bootstrap.add(
    "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star"
  );
  return node;
}

export async function getUrl(node, path, useGatewayForLocal) {
  if (path.slice(0, 6) != "/ipfs/") {
    if (useGatewayForLocal)
      return `https://${ getRandomGateway() }/ipfs/${(await node.files.stat(path)).cid.toString()}`;
    let chunks = [];
    for await (const chunk of node.files.read(path)) {
      chunks = chunks.concat(chunk);
    }
    const audblob = new Blob(chunks);
    return window.URL.createObjectURL(audblob);
  } else {
    return `https://${getRandomGateway()}` + path;
  }
}

export async function getList(node) {
  let songList = [];
  let albumList = {};
  let artistList = {};
  let id = 0;
  for await (const artist of node.files.ls("/")) {
    let song = { artist: artist.name };
    artistList[artist.name] = "No Image";
    for await (const album of node.files.ls("/" + artist.name)) {
      if (album.name == "artistArt") {
        artistList[artist.name] = "/" + artist.name + "/" + "artistArt";
      } else {
        song.album = album.name;
        albumList[album.name] = "No Image";
        for await (const aud of node.files.ls(
          "/" + artist.name + "/" + album.name
        )) {
          if (aud.name != "albumArt") {
            song.name = aud.name;
            song.path = "/" + artist.name + "/" + album.name + "/" + aud.name;
            song.id = id++;
            console.log(song);
            songList.push(JSON.parse(JSON.stringify(song)));
            console.log(songList);
          } else {
            albumList[album.name] =
              "/" + artist.name + "/" + album.name + "/" + aud.name;
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
        const albumName = tag.tags.album || "Unknown Album";
        const artistName = tag.tags.artist || "Unknown Artist";
        const songName = tag.tags.title || file.name;

        await node.files.write(
          `/${artistName}/${albumName}/${songName}`,
          new Uint8Array(await file.arrayBuffer()),
          { create: true, parents: true }
        );
        if (tag.tags.picture) {
          const { data, format } = tag.tags.picture;
          await node.files.write(`/${artistName}/${albumName}/albumArt`, data, {
            create: true,
            parents: true,
          });
          resolve([
            `/${artistName}/${albumName}/albumArt`,
            {
              name: songName,
              album: albumName,
              artist: artistName,
              path: `/${artistName}/${albumName}/${songName}`,
            },
          ]);
        }
      },
      onError: (error) => {
        reject(error);
      },
    });
  });
}

export async function getListFromHash(hash) {
  let songList = [];
  let albumList = {};
  let artistList = {};
  let id = 0;
  console.log(hash)
  const artistLs = await gatewayListHash(hash)
  console.log(artistLs)
  for(const artist of artistLs) {
    let song = { artist: artist };
    artistList[artist] = "No Image";
    const albumLs = await gatewayListHash(hash + "/" + artist);
    for (const album of albumLs) {
      if (album == "artistArt") {
        artistList[artist] =
          "/ipfs/" + hash + "/" + artist + "/" + "artistArt";
      } else {
        song.album = album;
        albumList[album] = "No Image";
        for (const aud of await gatewayListHash(
          hash + "/" + artist + "/" + album
        )) {
          if (aud != "albumArt") {
            song.name = aud;
            song.path = "/ipfs/" + hash + "/" + artist + "/" + album + "/" + aud;
            song.id = id++;
            console.log(song);
            songList.push(JSON.parse(JSON.stringify(song)));
            console.log(songList);
          } else {
            albumList[album] = "/ipfs/" + hash + "/" + artist + "/" + album + "/" + aud;
          }
        }
      }
    }
  }
  console.log(albumList);

  return [albumList, songList];
}

export async function getHashLocal(node) {
  return (await node.files.stat("/")).cid.toString();
}

export async function delSong(node, path) {
  node.files.rm(path, { flush: true });
}

export async function addRemoteSong(node, path) {
  let mpath = path.split("/");
  mpath.splice(1, 2);
  node.files.cp(path, mpath.join("/"));
}
