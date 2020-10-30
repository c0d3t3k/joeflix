import React, {Suspense} from 'react'
import {useQuery} from 'react-query'
import {useAtom} from 'jotai'

import {historyAtom, favoritesAtom} from '../atoms/state'
import './HomePage.css'
import Hero from '../components/Hero.js'
import TileList from '../components/TileList.js'
import feedbackState from '../atoms/feedbackState.js'
//import {useSetRecoilState} from 'recoil'
import Converter from '../components/Converter.js'
const BigTile = React.lazy(() => import('../components/BigTile.js'));




function HomePage() {

	//export const history = useAtom(historyInnerAtom);
	
	//const setFeedback = useSetRecoilState(feedbackState)
	const [feedback, setFeedback] = useAtom(feedbackState)

	const [history, setHistory] = useAtom(historyAtom)
	const [favorites, setFavorites] = useAtom(favoritesAtom)

	const {data: heroData, isLoading: heroIsLoading, error: heroError} = useQuery('hero', async () => {
		const res = await fetch(`${process.env.REACT_APP_TMDB_BASE_URL}/movie/577922?api_key=${process.env.REACT_APP_TMDB_KEY}`)
		const data = await res.json()
		//console.log('data', data)
		return Converter.convertToTile('movie', data)
	})
	const {data: popularData, isLoading: popularIsLoading, error: popularError} = useQuery('popular', async () => {
		const res = await fetch(`${process.env.REACT_APP_TMDB_BASE_URL}/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}`)
		const data = await res.json()
		return Converter.convertMoviesToTiles(data.results.splice(0, 5))
	})
	const {data: trendingMoviesData, isLoading: trendingMoviesIsLoading, error: trendingMoviesError} = useQuery('trending', async () => {
		const res = await fetch(`${process.env.REACT_APP_TMDB_BASE_URL}/trending/movie/week?api_key=${process.env.REACT_APP_TMDB_KEY}`)
		const data = await res.json()
		return Converter.convertMoviesToTiles(data.results.splice(0, 5))
	})
	const {data: topRatedData, isLoading: topRatedIsLoading, error: topRatedError} = useQuery('tr', async () => {
		const res = await fetch(`${process.env.REACT_APP_TMDB_BASE_URL}/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}`)
		const data = await res.json()
		return Converter.convertMoviesToTiles(data.results.splice(0, 5))
	})
	const {data: bigData, isLoading: bigIsLoading, error: bigError} = useQuery('big', async () => {
		const res = await fetch(`${process.env.REACT_APP_TMDB_BASE_URL}/movie/550?api_key=${process.env.REACT_APP_TMDB_KEY}`)
		const data = await res.json()
		return Converter.convertToTile('movie', data)
	})
	const {data: nowData, isLoading: nowIsLoading, error: nowError} = useQuery('now', async () => {
		const res = await fetch(`${process.env.REACT_APP_TMDB_BASE_URL}/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_KEY}`)
		const data = await res.json()
		return Converter.convertMoviesToTiles(data.results.splice(0, 5))
	})
	
	if (heroError || popularError || trendingMoviesError || topRatedError || bigError || nowError) {
		setFeedback({isVisible: true, message: 'Oops, something went wrong'})
	}

	const mostPopular = <TileList title="Most popular" data={popularData} isLoading={popularIsLoading}/>
	
    return (
        <div className="home">
        	<Hero data={heroData} isLoading={heroIsLoading} list={mostPopular}/>
			<div className="tlist__wrapper" fallback={<div></div>}>
        		<TileList title="Favorites" data={favorites} isLoading={false}/>
        	</div>
			<div className="tlist__wrapper" fallback={<div></div>}>
        		<TileList title="History" data={history} isLoading={false}/>
        	</div>
        	<div className="tlist__wrapper" fallback={<div></div>}>
        		<TileList title="Trending now" data={trendingMoviesData} isLoading={trendingMoviesIsLoading}/>
        	</div>
        	<div className="tlist__wrapper tlist__wrapper--grey">
        		<TileList title="Top rated" data={topRatedData} isLoading={topRatedIsLoading}/>
        	</div>
        	<Suspense fallback={<div></div>}>
        		<BigTile data={bigData} isLoading={bigIsLoading}/>
        	</Suspense>
        	<div className="tlist__wrapper tlist__wrapper--tall">
        		<TileList title="New releases" data={nowData} isLoading={nowIsLoading}/>
        	</div>
			
        </div>
    )
}

export default HomePage
