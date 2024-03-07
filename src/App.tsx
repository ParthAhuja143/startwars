import { RefObject, useEffect, useRef, useState } from 'react';
import './App.css';
import CSSRulePlugin from "gsap/CSSRulePlugin"
import Planet from './components/Planet/Planet';
import { CSSPlugin, Power3 } from "gsap/all"
import gsap from "gsap/gsap-core"
import starwars from './assets/starwars.jpeg';
import starwars_header from './assets/starwars-header.jpeg';
import { IconButton, Typography } from '@mui/material';
import { ArrowBackIosNewSharp, ArrowForwardIosSharp } from '@mui/icons-material';
import {useFetcher} from './hooks/useFetcher'
import ModalComp from './components/Modal/Modal';
import { SkeletonPlanet } from './components/Planet/SkeletonPlanet';

function App() {

  const [cleft , setcleft] = useState(-40)
  const [ctop , setctop] = useState(-40);
  let cursor: RefObject<HTMLDivElement> = useRef(null);
  let cursor2: RefObject<HTMLDivElement> = useRef(null);
  let cursorImg: RefObject<HTMLImageElement> = useRef(null);
  const [url, setUrl] = useState('https://swapi.dev/api/planets/?format=json')
  const {data, error, loading} = useFetcher(url);
  console.log(error, data, loading);
  const [currentPlanet, setCurrentPlanet] = useState(null);
  gsap.registerPlugin(CSSPlugin, CSSRulePlugin)

  const handleMouseOver = () => {

	gsap.to(cursor.current, 0.3, {
		width: 200,
		height: 200,
		boxShadow: "none",
		ease: Power3.easeIn,
	})
	
	gsap.to(cursorImg.current, 0.3, {
		opacity: 1,
		visibility : "visible"
	})
}

const handleMouseLeave = () => {

	gsap.to(cursor.current, 0.3, {
		width: 10,
		height: 10,
		backgroundColor : "rgb(215,187,178)",
		ease: Power3.easeIn,
	})

	gsap.to(cursorImg.current, 0.3, {
		visibility : 'none',
		opacity: 0,
	})
}

  useEffect(() => {
		window.addEventListener("mousemove" , (event) => {
			setcleft(event.clientX - 20)
			setctop(event.clientY - 20)
			//requestAnimationFrame(() => render())

			gsap.to(document.querySelector(".cursor"), {
				css: { left: event.clientX, top: event.clientY},
			})
		})

		return () => {

			window.removeEventListener("mousemove", (event) => {
				setcleft(event.pageX - 20)
				setctop(event.pageY - 20)

				gsap.to(cursor, {
					delay: 0.01,
					css: { left: event.clientX, top: event.clientY },
				})
			})
		}
	}, [])

  return (
	<>
    <div className="App">
			<img onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} src={starwars_header} alt='' className='starwars_header' width={"95%"} />
			<div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
			{
				loading && Array(10).fill(0).map((_, index) => {
					return <SkeletonPlanet key={index} />
				})
			}
			{
				!loading && data?.results.map((planet: any, index: number) => {
					return <Planet data={planet} key={index} handleMouseOver={handleMouseOver} handleMouseLeave={handleMouseLeave} setCurrentPlanet={setCurrentPlanet} />
				})
			}
			</div>
			{error && <Typography variant='body1' sx={{p: 2}}>There was an error fetching data :(</Typography>}
		<div>
		{data && 
		<>
		<IconButton disabled={data?.previous === null}>
			<ArrowBackIosNewSharp sx={{color: 'black'}} />
		</IconButton>
		<IconButton disabled={data?.next === null} onClick={() => setUrl(data.next)}>
			<ArrowForwardIosSharp sx={{color: 'black'}} />
		</IconButton>
		</>
		}
		</div>
    </div>
	<div className = 'cursor2' ref={cursor2} style = {{top : ctop + "px" , left : cleft + "px"}}></div>
	<div className='cursor' ref={cursor}>
		<img crossOrigin="anonymous" ref={cursorImg} src={starwars} alt=''  />
		<p className = 'cursor_text'>View project</p>
	</div>
	{currentPlanet && <ModalComp data={currentPlanet} setCurrentPlanet={setCurrentPlanet} />}
	</>
  );
}

export default App;
