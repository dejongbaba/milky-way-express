import SectionItem from "@/components/products/SectionItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/store/slices/itemsSlice";
import { cartActions } from "@/store/slices/cartSlice";

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
        let itemsTofilter = storeItems;
        if (filterss) {
            if (filterss.search) {
                itemsTofilter = itemsTofilter.filter((item) => {
                    return item.title.toLowerCase().includes(filterss.search.toLowerCase());
                });
            }

            if (filterss.min) {
                itemsTofilter = itemsTofilter.filter((item) => {
                    return item.price >= parseFloat(filterss.min);
                });
            }
            if (filterss.max) {
                itemsTofilter = itemsTofilter.filter((item) => {
                    return item.price <= parseFloat(filterss.max);
                });
            }
            if (filterss.pl) {
                itemsTofilter = itemsTofilter.filter((item) => {
                    return item.type == "Peace lily";
                });
            }
            if (filterss.scc) {
                itemsTofilter = itemsTofilter.filter((item) => {
                    return item.type == "Succulent";
                });
            }
            if (filterss.csp) {
                itemsTofilter = itemsTofilter.filter((item) => {
                    return item.type == "Curly Spider Plant";
                });
            }
            if (filterss.sp) {
                itemsTofilter = itemsTofilter.filter((item) => {
                    return item.type == "Snake plant";
                });
            }
            if (filterss.rce) {
                itemsTofilter = itemsTofilter.filter((item) => {
                    return item.type == "Red Chinese evergreen";
                });
            }

            setItemsToshow(itemsTofilter);
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
