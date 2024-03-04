import SectionItem from "@/components/products/SectionItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProducts, STATUSES } from "@/store/slices/itemsSlice";
import Loader from "@/components/Loader";

function ItemsSection({ filterss, search }) {
    const dispatch = useDispatch();

    let storeItems = useSelector((state) => {
        return state.items.itemsItems;
    });

    let [itemsToshow, setItemsToshow] = useState(storeItems);

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    useEffect(() => {
        setItemsToshow(storeItems);
    }, [storeItems]);

    useEffect(() => {
        if (search) {
            let itemsTofilter = storeItems;

            itemsTofilter = itemsTofilter.filter((item) => {
                return item.title.toLowerCase().includes(search);
            });
            setItemsToshow(itemsTofilter);
        }
    }, [search]);

    useEffect(() => {
        let itemsToFilter = storeItems;
        if (filterss) {
            if (filterss.search) {
                itemsToFilter = itemsToFilter.filter((item) => {
                    return item.title.toLowerCase().includes(filterss.search.toLowerCase());
                });
            }

            setItemsToshow(itemsToFilter);
        }
    }, [filterss]);

    return (
        <div className="grid grid-cols-3 gap-4">
            {itemsToshow.map((i) => {
                return (
                    <SectionItem
                        key={i.id}
                        id={i.id}
                        description={i.description}
                        title={i.title}
                        category={i.category}
                        price={i.price}
                        image={i.image}
                    />
                );
            })}
        </div>
    );
}

export default ItemsSection;
