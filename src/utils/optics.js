import * as O from 'optics-ts';
import * as _ from 'lodash';

export const containsOptic = (item) => {

	return O.optic()
		.iso(
			// Lens that is isomorphically converting an array given an item 
			// to a boolean determining whether the array contains that item.
			(val) => ({ 
				contained: (item && item.id) ? (_.findIndex(val, (currentItem) => item.id == currentItem.id) > -1) : false,
				value: val
			}),
			(obj) => {
				if(!(item && item.id)) {
					return collection;
				}

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
}