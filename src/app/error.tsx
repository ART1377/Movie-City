'use client'
import { useEffect } from 'react'
import Link from "next/link";
import Button from "./components/Global/Button";
import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (

      // <button
      //   onClick={
      //     () => reset()
      //   }
      // >
      //   Try again
      // </button>
    <div className='w-full h-full flex justify-center items-center mb-40 max-w-[480px] mx-auto'>

    <div className="text-text-dark rounded-2xl p-6 flex justify-center flex-col items-center text-center w-full mx-auto">
      <div className="relative w-56 h-48 sm:w-80 sm:h-72 mb-5 overflow-hidden rounded-2xl">
        <Image src={"/image/cry.jpg"} alt="not found image" fill />
      </div>
      <h2 className="mb-8">Something went wrong!</h2>
 
      <Link href="/">
        <Button btnType="main" type="button">
          Back to Home
        </Button>
      </Link>
    </div>
    </div>
  )
}