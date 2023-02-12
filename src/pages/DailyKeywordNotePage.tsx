import React, { useState, useEffect } from 'react'
import * as keywordNoteClient from 'apis/keywordNote';
import { usePopupStore } from 'stores/usePopupStore';
import { popupType } from 'utils/freezeTypes';

export default function DailyKeywordNotePage() {

  const openPopup = usePopupStore(state => state.openPopup);

  const [keywordNotes, setKeywordNotes] = useState([]);

  const getDailyKeywordNote = async () => {
    const dailyKeywordNotes = await keywordNoteClient.getDailyKeywordNote();
    setKeywordNotes(dailyKeywordNotes.data);
  }

  const openKeywordNoteDetailPopup = async (id: string, properties: any) => {
    openPopup({
      type: popupType.KEYWORD_NOTE_DETAIL,
      option: {
        keywordNoteId: id,
        title: properties.title.title[0].plain_text,
        topic: properties.topic.select.name,
        difficulty: properties.difficulty.select.name,
        reviewCnt: properties.reviewCnt.number,
        lastReviewDate: properties.lastReviewDate.date.start,
        onCompleteReview: () => getDailyKeywordNote()
      }
    })
  }

  useEffect(() => {
    getDailyKeywordNote();
  }, []);

  return (
    <section className='p-8'>
      {
        keywordNotes.map(({id, properties}: {id: string, properties: any}) => {
          return (
            <div key={id} className='border rounded p-4 mb-6 cursor-pointer' onClick={() => openKeywordNoteDetailPopup(id, properties)}>
              <p className='mb-2 p-2 text-xl border-b-2 inline-block'>## {properties.title.title[0].plain_text}</p>
              <div className='flex p-2 flex-col'>
                <div>[주제] {properties.topic.select.name}</div>
                <div>[난이도] {properties.difficulty.select.name}</div>
                <div>[복습 횟수] {properties.reviewCnt.number}</div>
                <div>[최근 복습 일자] {properties.lastReviewDate.date.start}</div>
              </div>
            </div>
          )
        })
      }
    </section>
  )
}
