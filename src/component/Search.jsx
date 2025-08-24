import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Fuse from 'fuse.js';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PakistanCurrency from "./PakistanCurrency";
import { CiSearch } from "react-icons/ci";
import { useDispatch } from "react-redux";
import recentVisited from "./recentVisited";
import { IoSearch } from "react-icons/io5";


const Search = () => {

    const dispatch = useDispatch();
    const [isOpen , setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { data } = useQuery({
        queryKey: ["searchedProducts"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:3001/products");
            return res.data;
        }
    })

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const fuse = new Fuse(data, {
        keys: ['color',"price","category"],      // Fields to search
        threshold: 0.3,      // Lower is stricter (0.0 = exact match, 1.0 = match everything)
    });
    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
        } else {
            const searchResults = fuse.search(query);
            setResults(searchResults.map(result => result.item));
        }
    }, [query]);
    return (
        <>
            <div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger><div className=""><IoSearch /></div></DialogTrigger>
                    <DialogContent className="h-90 w-200 overflow-y-auto custom-scrollbar
">
                        <DialogHeader>
                            <DialogTitle>Search color , category , price of the products</DialogTitle>
                            <DialogDescription>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        className="border border-gray-300 px-4 py-2 w-full mb-4"
                                    />
                                </div>
                                {results.length > 0 && (<div className="text-end text-md">{results.length} items searched</div>)}
                                <div > 
                                    
                                        {results.length > 0 ? (
                                            results.map((currResult) => {
                                                return (

                                                    <div key={currResult.id} className="flex mb-2" onClick={()=>{setIsOpen(false),navigate(`/products/${currResult.id}`),recentVisited(currResult , dispatch)}} >
                                                        <div className="w-30 md:w-40"><img src={currResult.images[0]}/></div>
                                                        <div className="pl-2 md:pl-5">
                                                            <div className="text-black text-start font-black text-md">{currResult.title}</div>
                                                            <div className="text-black text-start">Category: {currResult.category}</div>
                                                            <div className="text-black text-start">Color: {currResult.color}</div>
                                                            <div className="text-black text-start"><PakistanCurrency amount={currResult.price}/></div>
                                                        </div>
                                                    </div>

                                                )
                                            })
                                        ) : (
                                            query && <li className="text-gray-500">No results found</li>
                                        )}
                                    
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>

        </>
    )
}
export default Search;