import {atom, useAtom} from 'jotai'
import * as _ from 'lodash';

export const historyAtom = atom([])

export const historyState = atomFamily(
    (id) => (get) => {
        const history = get(historyAtom)[id]

        return history;
    },
    (id) => (get, set, val) => {
        const history = set(historyAtom, (current) => {
            current[id] = val;

            return _.clone(current);
        })

        return history;
    },
)

export const favoritesAtom = atom([])

export const favoritesState = atomFamily(
    (id) => (get) => {
        const favorite = get(favoritesAtom)[id]

        return favorite;
    },
    (id) => (get, set, val) => {
        const favorite = set(favoritesAtom, (current) => {
            current[id] = val;

            return _.clone(current);
        })

        return favorite;
    },
)