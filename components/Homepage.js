import Link from "next/link";
import { useRouter } from 'next/router';

import fetch from 'isomorphic-unfetch';

const Homepage = ({ notes }) => {
  const router = useRouter();

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
      method: "DELETE",
    });
      const data = res.json()
      console.log('RESPONSE', data);
      router.push('/')
    
  }

  return (
    <div className="mb-5">
      <h1 className="text-center font-black md:text-xl lg:text-3xl xl:text-4xl">
        YOUR NOTES
      </h1>
      <div className="my-5 item-center w-full h-full justify-center items-center gap-x-10 gap-y-3 flex flex-col md:flex-row md:flex-wrap">
        {notes.map((note) => (
          <div
            key={note._id}
            className="relative bg-yellow-100 rounded-lg h-52 max-h-52 w-80 min-w-80 mb-5 border-2 border-stone-700 hover:shadow-lg"
          >
            <h2 className="mb-2 py-2 divide-y-8 text-center bg-stone-700 font-extrabold border-2 border-stone-700 uppercase md:text-l lg:text-xl xl:text-2xl">
              {note.title}
            </h2>
            <p className="text-justify px-3">{note.description.slice(0, 170)}...</p>
            <div className="absolute inset-x-1/4 bottom-0 flex justify-center gap-x-5">
              <Link href={`/${note._id}`}>
                <a className="font-bold hover:text-stone-700">VIEW</a>
              </Link>
              <button onClick={() => handleDelete(note._id)} className="font-bold hover:text-stone-700">DELETE</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;


