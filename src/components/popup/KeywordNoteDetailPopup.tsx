import React, { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { usePopupStore } from 'stores/usePopupStore';
import * as keywordNoteClient from 'apis/keywordNote';
import Spinner from 'components/common/Spinner';
import Tag from 'components/common/Tag';
import { betweenNumber } from 'utils/common';
import useLoading from 'hooks/useLoading';

const KEYWORD = 'Keyword';
const OUTPUT_GUIDE = 'Output Guide';
const REFERENCE_LINKS = 'Reference Links';

export default function KeywordNoteDetailPopup() {
  const { getOption, closePopup } = usePopupStore();
  const {
    keywordNoteId,
    topic,
    difficulty,
    reviewCnt,
    lastReviewDate,
    onCompleteReview,
  } = getOption();

  let nextReviewDayIntervals: number[] | undefined;
  if (betweenNumber(reviewCnt + 1, 0, 3)) nextReviewDayIntervals = [1, 3, 5, 7];
  else if (betweenNumber(reviewCnt + 1, 4, 7)) nextReviewDayIntervals = [14, 17, 20, 23];
  else if (betweenNumber(reviewCnt + 1, 7, 10000)) nextReviewDayIntervals = [30, 45, 60, 90];

  const { loading, startLoading, endLoading } = useLoading();
  const [keywordNoteDetail, setKeywordNoteDetail] = useState();
  const [nextReviewDayInterval, setNextReviewDayInterval] = useState<number>();

  const completeReview = async () => {
    startLoading();
    const formatedToday = format(new Date(), 'yyyy-MM-dd');
    const formatedNextReviewDate = format(addDays(new Date(), nextReviewDayInterval as number), 'yyyy-MM-dd')
    const properties = {
      'reviewCnt': {  number: reviewCnt + 1, },
      'lastReviewDate': { date: { start: formatedToday, }, },
      'nextReviewDate': { date: { start: formatedNextReviewDate, } },
    };
    const response = await keywordNoteClient.updateKeywordNoteProperties(keywordNoteId, properties);
    onCompleteReview();
    endLoading();
    closePopup();
  }

  const printRecursive = (node: any) => {
    console.log(node.text);
    node.children.forEach((child: any) => {
      printRecursive(child);
    });
  }

  useEffect(() => {
    startLoading();
    (async function getKeywordNoteDetail() {
      const response = await keywordNoteClient.getKeywordNoteDetail(keywordNoteId);
      setKeywordNoteDetail(response.data);
      endLoading();
    })();
  }, []);

  if (loading) return <div className='p-4'><Spinner /></div>;
  return (
    <div className='p-4'>
      {
        keywordNoteDetail &&
          <React.Fragment>
            <div className='flex mb-2'>
              <Tag tag={{
                id: 'topic',
                name: `[주제] ${topic}`,
                color: '#3b82f6',
              }} />
              <Tag tag={{
                id: 'topic',
                name: `[난이도] ${difficulty}`,
                color: '#f59e0b',
              }} />
              <Tag tag={{
                id: 'topic',
                name: `[복습 횟수] ${reviewCnt}`,
                color: '#10b981',
              }} />
              <Tag tag={{
                id: 'topic',
                name: `[최근 복습 일자] ${lastReviewDate}`,
                color: '#03a9f4',
              }} />
            </div>
            <div className='border p-4 rounded mb-4'>
              <p className='p-1 text-xl mb-2'># Keyword</p>
              {(keywordNoteDetail[KEYWORD] as any).children.map((child: any) => <NotionBlock node={child} />)}
            </div>
            <div className='border p-4 rounded mb-4'>
              <p className='p-1 text-xl mb-2'># Output Guide</p>
              {(keywordNoteDetail[OUTPUT_GUIDE] as any).children.map((child: any) => <NotionBlock node={child} />)}
            </div>
            <div className='border p-4 rounded mb-4'>
              <p className='p-1 text-xl mb-2'># Reference Links</p>
              {(keywordNoteDetail[REFERENCE_LINKS] as any).children.map((child: any) => <NotionBlock node={child} type='link' />)}
            </div>
            <div>
              <p className='mb-2 p-2 border-t-2 border-t-slate-400'>재복습 일정 선택</p>
              <ul className="cursor-pointer mb-4 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="horizontal-list-radio-nextReviewInterval1"
                      type="radio"
                      name="list-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      onChange={() => { setNextReviewDayInterval(nextReviewDayIntervals![0]) }}
                    />
                    <label
                      htmlFor="horizontal-list-radio-nextReviewInterval1"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {nextReviewDayIntervals![0]}일 이후
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="horizontal-list-radio-nextReviewInterval2"
                      type="radio"
                      name="list-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      onChange={() => { setNextReviewDayInterval(nextReviewDayIntervals![1]) }}
                    />
                    <label
                      htmlFor="horizontal-list-radio-nextReviewInterval2"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {nextReviewDayIntervals![1]}일 이후
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="horizontal-list-radio-nextReviewInterval3"
                      type="radio"
                      name="list-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      onChange={() => { setNextReviewDayInterval(nextReviewDayIntervals![2]) }}
                    />
                    <label
                      htmlFor="horizontal-list-radio-nextReviewInterval3"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {nextReviewDayIntervals![2]}일 이후
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="horizontal-list-radio-nextReviewInterval4"
                      type="radio"
                      name="list-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      onChange={() => { setNextReviewDayInterval(nextReviewDayIntervals![3]) }}
                    />
                    <label
                      htmlFor="horizontal-list-radio-nextReviewInterval4"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {nextReviewDayIntervals![3]}일 이후
                    </label>
                  </div>
                </li>
              </ul>
              {
                nextReviewDayInterval && (
                  <div className='flex justify-center'>
                    <button
                      className='p-2 text-sm font-bold border rounded hover:bg-sgnr-blue hover:border-sgnr-blue'
                      onClick={completeReview}
                    >복습 완료</button>
                  </div>
                )
              }
            </div>
          </React.Fragment>
        
      }
    </div>
  )
}


/**
 * @see https://naveenda.medium.com/how-to-recursively-render-the-react-component-a821b3532894
 */
function NotionBlock({ node, type = 'text' }: any) {
  return (
    <ul className='relative ml-6'>
      • {type === 'link' ? <a href={node.text} target='_blank'>{node.text}</a> : node.text}
      <li>
        {
          node.children.length > 0 && (node.children as any).map((child: any) => {
            return <NotionBlock key={child.id} node={child} />
          })
        }
      </li>
    </ul>
  )
}