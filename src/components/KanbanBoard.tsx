import PlusIcon from '../icons/PlusIcon';
import { useMemo, useState, useEffect } from 'react';
import { Column, Id, Task } from '../types';
import ColumnContainer from './ColumnContainer';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import TaskCard from './TaskCard';
import { addColumn, getColumns, removeColumn, editColumn } from '../api/columns';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { addTask, removeTask, editTask } from '../api/tasks';

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(() => columns.map(col => col.id), [columns]);

  const [tasks, setTasks] = useState<Task[]>([]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ type: 'column' | 'task', id: Id } | null>(null);



  useEffect(() => {
    getColumns()
      .then((columnsFromBack) => {
        setColumns(columnsFromBack);
        setTasks(columnsFromBack.map((column) => column.tasks.map(t => ({ ...t, columnId: column.id }))).flat())
        // console.log("🚀 ~ file: KanbanBoard.tsx:36 ~ .then ~ columnsFromBack.map((column) => column.tasks).flat():", columnsFromBack.map((column) => column.tasks).flat())
      })
  }, [])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  function openDeleteConfirmation(type: 'column' | 'task', id: Id) {
    console.log('Opening delete confirmation', type, id);
    setItemToDelete({ type, id });
    setIsDeleteConfirmationVisible(true);
  }

  function closeDeleteConfirmation() {
    setIsDeleteConfirmationVisible(false);
    setItemToDelete(null);
  }

  async function handleDelete() {
    if (itemToDelete) {
      const { type, id } = itemToDelete!;

      if (type === 'column') {
        await deleteColumn(id);
      } else if (type === 'task') {
        deleteTask(id)
      }
      closeDeleteConfirmation();
    } else {
      console.error("itemToDelete is null")
    }
  }
  // async function handleDelete() {
  //   const { type, id } = itemToDelete!;

  //   if (type === 'column') {
  //     try {
  //       await deleteColumn(id);
  //       closeDeleteConfirmation();
  //     } catch (error) {
  //       // Handle any error that occurred during deletion
  //       console.error('Error deleting column:', error);
  //     }
  //   } else if (type === 'task') {
  //     try {
  //       await deleteTask(id);
  //       closeDeleteConfirmation();
  //     } catch (error) {
  //       // Handle any error that occurred during deletion
  //       console.error('Error deleting task:', error);
  //     }
  //   }
  // }


  return (
    <div
      className="
        m-auto
        flex
        min-h-screen
        w-full
        items-center
        overflow-x-auto
        overflow-y-hidden
        px-[40px]
        "
    >

      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map(col => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={(id: Id) => openDeleteConfirmation('column', id)}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter(task => task.columnId === col.id)}
                  openDeleteConfirmation={openDeleteConfirmation}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={() => {
              createNewColumn();
            }}
            className={`
            ${
              // if there is no column animate
              columns.length === 0 ? 'animate-bounce duration-75' : ''
              }
            h-[60px]
            w-[350px]
            cursor-pointer
            rounded-lg
            bg-mainBackgroundColor
            border-2
            border-columnBackgroundColor
            p-4
            ring-rose-500
            hover: ring-2
            flex
            gap-2
            `}
          >
            <PlusIcon />
            Add Column
          </button>
        </div>

        <DeleteConfirmationModal
          isVisible={isDeleteConfirmationVisible}
          onConfirm={handleDelete}
          onCancel={closeDeleteConfirmation}
        />


        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter(task => task.columnId === activeColumn.id)}
                openDeleteConfirmation={openDeleteConfirmation}
              />
            )}
            {activeTask && (
              <TaskCard task={activeTask} deleteTask={deleteTask} updateTask={updateTask} />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );

  async function createTask(columnId: Id) {
    try {
      const newTask = await addTask(columnId, `Task ${tasks.length + 1}`);
      setTasks([...tasks, newTask]);
      console.log("🚀 ~ file: KanbanBoard.tsx:212 ~ createTask ~ newTask:", newTask)
    } catch (error) {
      console.error('Error creating task:', error);
    }
  }

  async function deleteTask(id: Id) {
    try {
      await removeTask(id);

      const newTasks = tasks.filter(task => task.id !== id);
      setTasks(newTasks);
    } catch (error) {
      console.log("error deleting task", error);
    }

  }

  function updateTask(id: Id, title: string) {
    try {
      editTask(id, title);
      const newTasks = tasks.map(task => {
        if (task.id !== id) return task;
        return { ...task, title };
      });
      setTasks(newTasks);
    } catch (error) {
      throw new Error("Failed to update task");
    }

  }

  async function createNewColumn() {
    const columnToAdd = await addColumn('title')
    setColumns(columns => [...columns, columnToAdd]);
  }

  function deleteColumn(id: Id) {
    removeColumn(id);
    const filteredColumns = columns.filter(col => col.id !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter(t => t.columnId !== id);
    setTasks(newTasks);
  }

  async function updateColumn(id: Id, title: string) {
    editColumn(id, { title });
    const newColumns = columns.map(col => {
      if (col.id !== id) return col;
      return { ...col, title }
    });

    setColumns(newColumns);

  }
  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }
  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    setColumns(columns => {
      const activeColumnIndex = columns.findIndex(col => col.id === activeId);

      const overColumnIndex = columns.findIndex(col => col.id === overId);
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === 'Task';
    const isOverTask = over.data.current?.type === 'Task';

    if (!isActiveTask) return;

    //I'm dropping Task over another task
    if (isActiveTask && isOverTask) {
      setTasks(tasks => {
        const activeIndex = tasks.findIndex(t => t.id === activeId);
        const overIndex = tasks.findIndex(t => t.id === overId);

        tasks[activeIndex].columnId = tasks[overIndex].columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverColumn = over.data.current?.type === 'Column';

    //I'm dropping a Task over a column
    if (isActiveTask && isOverColumn) {
      setTasks(tasks => {
        const activeIndex = tasks.findIndex(t => t.id === activeId);

        tasks[activeIndex].columnId = overId;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }

  function generateId() {
    /*Generate a random number between 0 and 10000 */
    return Math.floor(Math.random() * 10001);
  }
}
export default KanbanBoard;
