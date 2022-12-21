import React, { useRef } from 'react'
import Toggle from '../components/common/Toggle'
import { AiOutlineEdit, AiOutlinePlusCircle } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { MdRadioButtonUnchecked, MdOutlineCheckCircleOutline } from 'react-icons/md';
import { TiMediaPlayOutline, TiMediaPause, TiMediaStop } from 'react-icons/ti';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const CONTAINER_CLASSES = 'mb-4 p-2 border rounded'

export default function TaskManagementPage() {
  const slumpToggleRef = useRef();
  const slumpGetOverToggleRef = useRef();

  return (
    <section className='p-8'>
      {/* task-management */}
      <section className='border-b-2 border-gray-600 py-4 px-0 w-full mb-8'>
        <p id='mind-text' className='mb-8 text-2xl text-center text-sgnr-blue font-bold'>
          👏측정할 수 없으면 관리할 수 없고, 관리할 수 없으면 개선할 수 없다👏
        </p>
        <div id='slump-container' className={CONTAINER_CLASSES}>
          <header className='flex justify-between p-2'>
            <h1 className='flex items-center text-xl font-bold'>😹SLUMP</h1>
            <div className='flex'>
              <button className='mr-4 p-2 text-sm font-bold border rounded hover:bg-sgnr-blue hover:border-sgnr-blue'>Mind</button>
              <button className='mr-4 p-2 text-sm font-bold border rounded hover:bg-sgnr-blue hover:border-sgnr-blue'>Save</button>
              <div className='flex items-center'>
                <span className=' mr-2 text-lg font-bold'>Get Over</span>
                <Toggle ref={slumpGetOverToggleRef} />
              </div>
              <div className='flex items-center'>
                <span className='mr-2 text-lg font-bold'>Today is slump</span>
                <Toggle ref={slumpToggleRef} />
              </div>
            </div>
          </header>
          <div className='p-2 text-center'>
            <textarea
              id="slump-reason"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="작성 가이드
              1. 감정 주기와 같은 이유 없는 슬럼프 인가요?
              2. 슬럼프 이유를 고민해보고 작성해주세요
              3. 슬럼프를 극복하셨나요? 극복 기준은 무엇인가요? 어떻게 극복하셨나요?"
            />
          </div>
        </div>
        <div id='condition-container' className={CONTAINER_CLASSES}>
          <header className='flex justify-between p-2'>
            <h1 className='flex items-center text-xl font-bold'>🔥 CONDITION</h1>
            <div className='flex'>
              <button className='mr-4 p-2 text-sm font-bold border rounded hover:bg-sgnr-blue hover:border-sgnr-blue'>Mind</button>
              <button className='mr-4 p-2 text-sm font-bold border rounded hover:bg-sgnr-blue hover:border-sgnr-blue'>Save</button>
              <button className='mr-4 p-2 text-sm font-bold border rounded hover:bg-sgnr-blue hover:border-sgnr-blue'>Add</button>
            </div>
          </header>
          <ul className='p-2 text-center'>
            <li className='mb-2'>
              <div className='p-2 text-left flex justify-between'>
                <div className='flex items-center'>
                  <span className='mr-4'>22:11:27</span>
                  <span className='mr-4 text-lg font-bold text-green-500'>GOOD</span>
                  <Toggle ref={slumpToggleRef} />
                  <span className='mr-4 text-lg font-bold text-red-500'>BAD</span>
                </div>
                <button className='p-2 text-sm font-bold border rounded hover:bg-sgnr-blue hover:border-sgnr-blue'>Remove</button>
              </div>
              <input type="text" id="success" className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full dark:bg-gray-700 dark:border-green-500" placeholder="Success input" />
            </li>
            <li className='mb-2'>
              <div className='p-2 text-left flex justify-between'>
                <div className='flex items-center'>
                  <span className='mr-4'>22:11:27</span>
                  <span className='mr-4 text-lg font-bold text-green-500'>GOOD</span>
                  <Toggle ref={slumpToggleRef} />
                  <span className='mr-4 text-lg font-bold text-red-500'>BAD</span>
                </div>
                <button className='p-2 text-sm font-bold border rounded hover:bg-sgnr-blue hover:border-sgnr-blue'>Remove</button>
              </div>
              <input type="text" id="success" className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full dark:bg-gray-700 dark:border-green-500" placeholder="Success input" />
            </li>
          </ul>
        </div>
      </section>
      <section id='project-board' className='border rounded p-4 pb-2 w-full mb-8 flex flex-col justify-between'>
        <header className='flex justify-between w-full mb-4'>
          <h1 className='text-2xl p-2 font-bold'>📚 PROJECTS</h1>
          <div className='flex'>
            <button className='mr-4 p-2 text-sm font-bold border rounded hover:bg-sgnr-blue hover:border-sgnr-blue'>Mind</button>
            <button className='mr-4 p-2 text-sm font-bold border rounded hover:bg-sgnr-blue hover:border-sgnr-blue'>Add</button>
          </div>
        </header>

        {/* @see https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/about/examples.md */}
        <DragDropContext onDragEnd={(result: any) => console.log(result)}>
          <Droppable droppableId="droppable" direction="horizontal">
            {
              (provided: any, snapshot: any) => (
                <ul
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className='flex overflow-x-auto pb-2'
                >
                  {
                    ['1', '2', '3', '4', '5', '6', '7', '8'].map((item, index) => (
                      <Draggable
                        key={item}
                        draggableId={item}
                        index={index}
                      >
                        {
                          (provided: any, snapshot: any) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className='border min-w-[20%] mx-2'
                            >
                              <header className='flex justify-between items-center p-2'>
                                <span className='p-1 bg-orange-400 font-bold'>Project Name</span>
                                <div className='text-xl flex items-center'>
                                  <button className='ml-2 hover:text-orange-400'><BsThreeDots /></button>
                                  <button className='ml-2 hover:text-orange-400'><AiOutlinePlusCircle /></button>
                                </div>
                              </header>
                              <DragDropContext onDragEnd={console.log}>
                                <Droppable droppableId="droppable">
                                  {
                                    (provided: any, snapshot: any) => (
                                      <ul
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className='flex-col p-2'
                                      >
                                        {
                                          ['1', '2', '3', '4', '5', '6', '7', '8'].map((item, index) => (
                                            <Draggable
                                              key={item}
                                              draggableId={item}
                                              index={index}
                                            >
                                              {
                                                (provided: any, snapshot: any) => (
                                                  <li 
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className='border rounded p-2 mb-4'
                                                  >
                                                    <div>
                                                      <button><BsThreeDots /></button>
                                                      <button><AiOutlineEdit /></button>
                                                      <button><TiMediaPlayOutline /></button>
                                                      <button><TiMediaPause /></button>
                                                      <button><TiMediaStop /></button>
                                                      <span>23:32:32</span>
                                                    </div>
                                                    <p>
                                                      <button><MdRadioButtonUnchecked /></button>
                                                      <button><MdOutlineCheckCircleOutline /></button>
                                                      <span>hello</span>
                                                    </p>
                                                  </li>
                                                )
                                              }
                                            </Draggable>
                                            )
                                          )
                                        }
                                      </ul>
                                    )
                                  }
                                </Droppable>
                              </DragDropContext>
                              {/* {item}-project-name */}
                            </div>
                          )
                        }
                      </Draggable>
                    ))
                  }
                </ul>
              )
            }
          </Droppable>
        </DragDropContext>
      </section>
    </section>
  )
}
