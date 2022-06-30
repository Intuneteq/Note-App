import Homepage from "../components/Homepage";

import fetch from 'isomorphic-unfetch';

export default function Home({notes}) {
  console.log('alright');
  return (
    <div className="pt-20 px-5 pb-5">
      <Homepage notes = {notes} />
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch("https://tobi-note-app.vercel.app/api/notes/");
  const  data  = await res.json();
  const notes = data.data
  return {
    props: {notes}
  }
}
