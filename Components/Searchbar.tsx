"use client"
import { scrapeAndStoreProduct} from '@/lib/actions';
import {FormEvent, useState } from "react";
const isValidAmazonProductURL=(url:string)=>{
try{
    const parsedURL=new URL(url);
    const hostname=parsedURL.hostname;

    if(hostname.includes('amazon.com') ||
      hostname.includes('amazon.') ||
      hostname.includes('amazon.co.uk') ||
      hostname.includes('amazon.de') ||
      hostname.includes('amazon.fr') ||
      hostname.includes('amazon.it') ||
      hostname.includes('amazon.es') ||
      hostname.includes('amazon.in') ||
    hostname.endsWith('amazon') 
)
    {
        return true;
    }
  }  catch(error){
 return false;
}
return false;
}
const Searchbar = () => {
    const [searchPrompt, setSearchPrompt] = useState('');
    const[isLoading, setIsLoading]=useState(false);
    const handleSubmit= async(event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const isValidLink=isValidAmazonProductURL(searchPrompt);
       if(!isValidLink) 
        return  alert('Please provide a valid Amazon Product link')
    
       try{
        setIsLoading(true);
        //scrape the product page
        const product=await scrapeAndStoreProduct(searchPrompt);
       } catch(error){
    console.log(error);
       } finally{
        setIsLoading(false);
       }
    }
  return (
    <form 
    className="flex flex-wrap gap-5 mt-15"
    onSubmit={handleSubmit}
    >
        <input 
        type="text"
        value={searchPrompt}
        onChange={(e)=>setSearchPrompt(e.target.value)}
        placeholder="Enter your product link"
        className="searchbar-input"
        />
        <button type="submit" className="searchbar-btn"
        disabled={searchPrompt ===''}
        >
            {isLoading ? 'Loading...':'Track Price'}
    </button> 
       </form>
  )
}

export default Searchbar