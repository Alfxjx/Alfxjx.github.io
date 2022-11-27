import { BsGithub, BsTwitter, BsFillEnvelopeFill } from 'react-icons/bs'

export function Footer() {
  return <div className='py-2 w-full flex flex-col justify-center items-center bg-slate-100 dark:bg-gray-900'>
    <div className='flex justify-around items-center'>
      <a href="https://github.com/Alfxjx" className='mx-2 p-2 rounded-full hover:bg-slate-300 hover:text-black'>
        <BsGithub style={{ width: '1.5em', height: '1.5em' }} />
      </a>
      <a href="https://twitter.com/alfxjx" className='mx-2 p-2 rounded-full hover:bg-[#1D9BF0] hover:text-white'>
        <BsTwitter style={{ width: '1.5em', height: '1.5em' }} />
      </a>
      <a href="mailto:xujianxiang@abandon.work" className='mx-2 p-2 rounded-full hover:bg-white hover:text-black'>
        <BsFillEnvelopeFill style={{ width: '1.5em', height: '1.5em' }} />
      </a>
    </div>
    <div className='font-thin ml-2 text-xs'>
      Powerd by {' '}
      <a href="https://nextjs.org/" className='hover:text-primary-500'>
        Next.js
      </a>
      {' '}on Vercel with {' '}
      <span className='text-red-500'>
        ♥
      </span>
      {' '} 2020-2022
    </div>
  </div >;
}