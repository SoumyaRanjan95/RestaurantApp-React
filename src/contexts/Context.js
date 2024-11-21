import { createContext } from "react"
const ResturantContext = createContext();
const UserContext = createContext({});
const MessageContext = createContext()

/*const MyContext = createContext({
    resturant: "",
    setResturant: () => {}
})*/

export {ResturantContext,UserContext,MessageContext}