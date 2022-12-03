const Router = require("router");
const router = Router();

const baseapp = require("../controllers/basecontroller");
const createTodo = require("../controllers/createToDoController");
const getAllTodos=require("../controllers/getAllToDosController");
const deleteTodo=require("../controllers/deleteTodoController");
const getTodoTasks=require("../controllers/getTodoTasksController");
const updateTodo=require("../controllers/updateTodoController");


router.post("/v1/todo/createTodo", createTodo);
router.get("/v1/todo/getAllTodos/:sortType", getAllTodos);
router.delete("/v1/todo/deleteTodo/:id", deleteTodo);
router.get("/v1/todo/getTodoTasks/:id", getTodoTasks);
router.put("/v1/todo/updateTodo/:id", updateTodo);
router.get("/v1/todo/",baseapp);

module.exports = router;
