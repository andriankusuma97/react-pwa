import App from "../App";
import PWATodoApp from "../pages/ToDoList/ToDoList";



const AppRoutes = [
    {
        path:"/",
        element:<App />,
        children:[]
    },
    {
        path: "/todo",
        element: <PWATodoApp />,
    },

]

export default AppRoutes;
