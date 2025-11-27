'use client'
import { Dna } from "react-loader-spinner";

export default function Loading() {
  return (
    <>
    <div className='mx-auto text-center'>

      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{height:'100vh', display:'flex', justifyContent:'center',alignItems:'center'}}
        wrapperClass="dna-wrapper"
        />
    </div>
    </>
  );
}
