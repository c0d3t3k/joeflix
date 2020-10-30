import * as O from 'optics-ts';
import * as _ from 'lodash';

import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useAtom, atom } from 'jotai'
import { focus, useAtomArrayFamily } from "@c0d3t3k/jotai-optics";

import {historyAtom, favoritesAtom} from '../atoms/state'
import './Tile.css'
import { findIndex } from 'lodash';


// This is a utility
const containsOptic = (item) => 
	O.optic()
		.iso(
			// Lens that is isomorphically converting an array given an item 
			// to a boolean determining whether the array contains that item.
			(val) => ({ 
				contained: (_.findIndex(val, (currentItem) => item.id == currentItem.id) > -1),
				value: val
			}),
			(obj) => {
				const collection = _.clone(obj.value);

				const index = _.findIndex(collection, (currentItem) => item.id == currentItem.id);

				if(obj.contained && index < 0) {
					collection.push(item);
				} else if(!obj.contained && index > -1) {
					collection.splice(index, 1);
				}

				return collection;
			}
		)
		.prop('contained');

function Tile({data}) {

	// https://github.com/merisbahti/jotai-optics
	const [isInHistory, setIsInHistory] = 
		useAtom(focus(historyAtom, optic => optic.compose(containsOptic(data))))
	const [isFavorite, setIsFavorite] = 
		useAtom(focus(favoritesAtom, optic => optic.compose(containsOptic(data))))

	const toggleFavorites = () => {
		setIsFavorite(!isFavorite);
	}
	const playMedia = () => {
		// const dest = `playing/${data ? data.type : ''}/${data ? data.id : ''}`
		// setHistory(history => history.push(dest));

		setIsInHistory(!isInHistory);
	}

    return (
        <div className="tile" style={data ? {backgroundImage: `url(${process.env.REACT_APP_TMDB_IMG_URL}/w500${data.banner})`} : {}}>
        	<div className="tile__cont">
        		<h3 className="tile__title" style={{'width': '100%'}}>{data ? data.title : ''}</h3>
				<button className="tile__play"  onClick={() => toggleFavorites()}>
        			{isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
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
