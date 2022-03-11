import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    //Resolução explicada: primeiro, verifica-se se o título é nulo. Se sim, retorna-se nada e a função para. Em seguida, é definida uma nova task por meio da 
    //const newTask. O id será um inteiro randômico, o title será recuperado do input e o isComplete é false por padrão. Essa task é adicionada ao array de tasks
    // utilizando o hook setTasks() e, por fim, resetamos também o valor do input ao adicionar a task com o hook setNewTaskTitle().
    if (!newTaskTitle) return;
    
    const newTask =  {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false
    }

    setTasks(oldState => [...oldState, newTask])
    setNewTaskTitle('')
  }

  function handleToggleTaskCompletion(id: number) {
    //Resolução explicada: criamos um novo array cujo valor é resultado do mapeamento do array de tasks verificando se o id da task mapeada é o mesmo 
    //do id passado como argumento para a função. Se sim, a task é retornada com seu valor de isComplete invertido. Se não, a task é retornada sem alterações.
    //Ao final de tudo, utilizamos a função setTasks() passando o novo array resultante do mapeamento.
    const newTasks = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete,
    } : task)

    setTasks(newTasks)
  }

  function handleRemoveTask(id: number) {
    //Resolução explicada: criar um novo array percorrendo o array de tasks com a função filter(), cuja condição é retornar toda task que possua o id diferente
    //do id passado como argumento à função. Executamos então o setTasks() passando este novo array que não conta com a task que deletamos.
    const filteredTasks = tasks.filter(task => task.id !== id)

    setTasks(filteredTasks)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}