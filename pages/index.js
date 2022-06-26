import Homepage from "../components/Homepage";

import fetch from 'isomorphic-unfetch';

export default function Home({notes}) {
  return (
    <div className="pt-20 px-5 pb-5">
      <Homepage notes = {notes} />
    </div>
  )
}


Home.getInitialProps = async() => {
  const res = await fetch("https://tobi-note-app.vercel.app/api/notes/");
  const  {data}  = await res.json();

  return  {notes: data};
};