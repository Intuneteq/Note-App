import fetch from 'isomorphic-unfetch';

import { useRouter } from 'next/router';
import Link from 'next/link';


const MyNote = ({note}) => {
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
      method: "DELETE",
    });
      const data = res.json()
      console.log('RESPONSE', data);
      router.push('/')
    
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='pt-20 px-5 pb-20 bg-yellow-100 h-fit min-h-screen relative'>
      <h1 className='text-center mb-5 uppercase font-black md:text-xl lg:text-3xl xl:text-4xl'>{ note.title }</h1>
      <p className='font-medium text-justify mb-8'>{ note.description }</p>
      <div className='absolute inset-x-1/4 bottom-11 flex justify-center gap-5'>
        <button className='font-bold bg-stone-700 p-3 rounded-md hover:text-stone-700 hover:bg-black' onClick={() => handleDelete(note._id)}>
          DELETE NOTE
        </button>
        <Link  href={`/${note._id}/updateblog`}>
          <a className='font-bold bg-stone-700 p-3 rounded-md hover:text-stone-700 hover:bg-black'>EDIT NOTE</a>
        </Link>
      </div>
    </div>
  )
}

MyNote.getInitialProps = async ({query: {id} }) => {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`);
    const { data } = await res.json();
  
    return {note: data}
  }

export default MyNote;