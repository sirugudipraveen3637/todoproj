const Router = require("router");
const router = Router();
const auth=require("../middleware/auth")

const baseapp = require("../controllers/basecontroller");
const createTodo = require("../controllers/createToDoController");
const getAllTodos=require("../controllers/getAllToDosController");
const deleteTodo=require("../controllers/deleteTodoController");
const getTodoTasks=require("../controllers/getTodoTasksController");
const updateTodo=require("../controllers/updateTodoController");
const sendEmail=require("../controllers/sendEmailcontroller");

router.post("/v1/todo/createTodo", createTodo);
router.get("/v1/todo/getAllTodos/:sortType", getAllTodos);
router.delete("/v1/todo/deleteTodo/:id", deleteTodo);
router.get("/v1/todo/getTodoTasks/:id", getTodoTasks);
router.put("/v1/todo/updateTodo/:id", updateTodo);
router.get("/v1/todo/",baseapp);
router.post("/v1/todo/sendEmail",sendEmail);

module.exports = router;
