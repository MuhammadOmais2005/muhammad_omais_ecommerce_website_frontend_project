import { CiStar } from "react-icons/ci";
import { useSelector } from "react-redux";
import { addStarItems } from "@/Slices/productsSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { useState } from "react"
import { addStarItemsData } from "@/Slices/productsSlice";

const stars = ["star1", "star2", "star2", "star4", "star5"]

const Stars = ({ id }) => {


    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["rating", id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3001/products/${id}`);
            return res.data
        },
    });

    const dispatch = useDispatch();
    const { starItems } = useSelector((state) => {
        return state.products;
    })
    const updateData = async (updatedData) => {
        const res = await axios.put(`http://localhost:3001/products/${id}`, updatedData);
        return res;
    }

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["rating", id] });
        }
    });


    const handleClick = (index) => {
        const saved = localStorage.getItem("Stars");
        const stared = saved ? JSON.parse(saved) : []
        const existing = stared?.findIndex((currStar) => {
            return currStar.id === id;
        })

        if (existing !== -1) {
            const oldStar = stared.filter((currStar) => {
                return currStar.id !== id
            });
            const oldValue = stared[existing].value;
            const newValue = data?.rating - oldValue + index + 1;
            const newStar = [...oldStar, { id: id, value: index + 1 }];
            localStorage.setItem("Stars", JSON.stringify(newStar));
            dispatch(addStarItems(newStar));
            // updateData({ ...data, rating: newValue });
            mutation.mutate({ ...data, rating: newValue });

        } else {
            const newStar = [...stared, { id: id, value: index + 1 }];
            localStorage.setItem("Stars", JSON.stringify(newStar));
            dispatch(addStarItems(newStar));
            const newValue = data?.rating + index + 1;
            const newNumber = data?.number + 1;
            // updateData({ ...data, rating: newValue })
            mutation.mutate({ ...data, rating: newValue, number: newNumber });
            // dispatch(addStarItemsData(JSON.stringify([...starItemsData, id])));

        }
    }
    const starColor = (index, discard) => {
        if (discard) {
            return ""
        }
        const existing = starItems.findIndex((currStar) => {
            return currStar.id === id
        });
        // const removeExisting = starItems?.filter((currItem) => {
        //     return currItem === id
        // });
        // localStorage.setItem("starItemsData", JSON.stringify([...removeExisting]));
        // dispatch(addStarItemsData([...removeExisting]))

        if (existing !== -1) {
            const value = starItems[existing].value;
            return (index + 1) <= value ? "text-[#FFD700]" : "text-black";
        } else {
            return ""
        }
    }

    // const saved = localStorage.setItem("Stars");
    // const stare = saved ? JSON.parse(saved) ? [];

    const discard = () => {
        const saved = localStorage.getItem("Stars");
        const stared = saved ? JSON.parse(saved) : [];
        const removedStarData = stared.filter((currStar) => {
            return currStar.id !== id
        });
        const currValue = stared.reduce((accum, currStar) => {
            if (currStar.id === id) {
                return accum = currStar.value;
            } else {
                return accum;
            }
        }, 0);
        const newValue = data?.rating - Number(currValue);
        console.log(newValue);
        localStorage.setItem("Stars", JSON.stringify([...removedStarData]));
        dispatch(addStarItems([...removedStarData]));
        // updateData({ ...data, rating: newValue })
        const newNumber = data?.number - 1;
        mutation.mutate({ ...data, rating: newValue, number: newNumber });
    }

    console.log(starItems);

    const checkExist = starItems.some((currStarItem)=>{
        return currStarItem.id == id
    })
   
    return (
        <>
            {/* <h1>Stars</h1>
            <h1 className="text-5xl">Ratings: {data?.rating}</h1>
            <h1 className="text-5xl">Ratings: {data?.number}</h1> */}
            <div className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl  md:text-5xl font-bold font-a mt-3 md:mt-5 xl:mt-7">RATING</div>
            <div className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl  md:text-5xl font-bold font-a my-1 md:my-2 xl:mb-3">{data?.number > 0 && data?.rating / data?.number + "/5"}</div>
            <div className="flex flex-wrap place-content-center">
                <div className="flex flex-wrap gap-x-1 md:gap-x-2">
                    {stars.map((currStar, index) => {
                        return (
                            <button type="button" key={index} className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl" onClick={(event) => { event.preventDefault(); handleClick(index); }}><FaStar className={`${starColor(index)}`} /></button>
                        )
                    })}
                </div>
            </div>

            {checkExist && (
                <div className={`flex flex-wrap place-content-center mb-3 md:mb-5 xl:mb-7`}>
                    <button className="hover:font-bold" type="button" onClick={discard}>(Discard)</button>
                </div>
            )}
        </>
    )
}
export default Stars