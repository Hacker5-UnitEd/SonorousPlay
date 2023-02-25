import Upload_box from './components/Upload.jsx';


export default function App() {
  return (
    <div className={ `grid h-screen w-screen place-items-center bg-black text-center px-20 py-5 bg-[url("https://tailwind-ui.hacker5united.repl.co/src/assets/darkBackground.png")]` }>
      <div className="w-[calc(70vw)] h-full backdrop-blur-md bg-white/30 rounded-md p-2">
        <Upload_box />
      </div>
    </div>
  );
}

