// import React from 'react'
// import style from './CustomSlider.module.css'
// import Img from '../Img';
// import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

// type Props = {
    
// }

// const CustomSlider = (props: Props) => {




//     const prev = +current == 1 ? +newArray.length : +current - 1;
//     const next = +current == +newArray.length ? 1 : +current + 1;
  
//     const prev2 =
//       +current == 1
//         ? +newArray.length - 1
//         : +current == 2
//         ? +newArray.length
//         : +current - 2;
//     const next2 =
//       +current == +newArray.length
//         ? 2
//         : +current == +newArray.length - 1
//         ? 1
//         : +current + 2;



//   return (
//     <>
    
//     {newArray.map((season: Season,index:number) => {
//           if (!season.season_number) {
//             return;
//           }
//           return (
//             <div
//               key={season.id}
//               onClick={() => setCurrent(index+1)}
//               className={`absolute w-fit rounded-2xl cursor-pointer
//               ${season.season_number == current && "shadow-2xl"} 
//               ${
//                 season.season_number == current
//                   ? style.current
//                   : season.season_number == prev
//                   ? style.prev
//                   : season.season_number == next
//                   ? style.next
//                   : season.season_number == next2
//                   ? style.next2
//                   : season.season_number == prev2
//                   ? style.prev2
//                   : "hidden"
//               } `}
//             >
//               <div className="relative rounded-2xl overflow-hidden w-[100px] h-[140px] xxs:w-[120px] xxs:h-[170px] xs:w-[140px] xs:h-[190px] sm:w-[180px] sm:h-[230px] lg:w-[200px] lg:h-[260px] ">
//                 <Img
//                   url={season?.poster_path!}
//                   alternative={`${season.name} Poster`}
//                   size="w342"
//                   style="w-full h-full"
//                 />
//               </div>
//             </div>
//           );
//         })}
//         <div className="absolute bottom-[27%] xxs:bottom-[23%] xs:bottom-[14%] lg:bottom-[8%] flex gap-5">
//           <div
//             onClick={() => setCurrent(prev)}
//             className="text-lg text-main-green cursor-pointer"
//           >
//             <BsChevronLeft strokeWidth="3" />
//           </div>
//           <div
//             onClick={() => setCurrent(next)}
//             className="text-lg text-main-green cursor-pointer"
//           >
//             <BsChevronRight strokeWidth="3" />
//           </div>
//         </div>
    
//     </>
//   )
// }

// export default CustomSlider