import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useAtom, atom } from 'jotai'

import './Tile.css'

export const favoriteState = atom(true);

function Tile({data}) {
	const [isFavorite, setFavorite] = useAtom(favoriteState)
	const history = useHistory();

	const toggleFavorites = () => {
		setFavorite(!isFavorite)
		console.log("Favorite:", isFavorite)
	}
	const playMedia = () => {
		const dest = `playing/${data ? data.type : ''}/${data ? data.id : ''}`
		history.push(dest);
	}

    return (
        <div className="tile" style={data ? {backgroundImage: `url(${process.env.REACT_APP_TMDB_IMG_URL}/w500${data.banner})`} : {}}>
        	<div className="tile__cont">
        		<h3 className="tile__title" style={{'width': '100%'}}>{data ? data.title : ''}</h3>
				<button className="tile__play"  onClick={() => toggleFavorites()}>
        			{isFavorite.isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
        		</button>
				<Link to={`/playing/${data ? data.type : ''}/${data ? data.id : ''}`} >
        		<button className="tile__play" onClick={playMedia}>
        			<img className="tile__icon" src={require('../images/streamline-icon-controls-play@15x15.png')} alt=""/>
        		</button>
				</Link>
        	</div>
        </div>
    )
}

export default Tile
