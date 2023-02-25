import React, { useState, useEffect } from 'react'
import * as keywordNoteClient from 'apis/keywordNote';
import { usePopupStore } from 'stores/usePopupStore';
import { popupType } from 'utils/freezeTypes';
import styles from './DailyKeywordNotePage.module.css';
import textStyles from 'styles/Text.module.css';
import { useNavigate } from 'react-router-dom';
import { path } from 'router/path';

export default function DailyKeywordNotePage() {

  const { openPopup, closePopup } = usePopupStore();
  const navigate = useNavigate();

  const [keywordNotes, setKeywordNotes] = useState([]);

  const getDailyKeywordNote = async () => {
    try {
      const dailyKeywordNotes = await keywordNoteClient.getDailyKeywordNote();
      setKeywordNotes(dailyKeywordNotes.data);
    } catch (error) {
      openPopup({
        type: popupType.MESSAGE,
        option: {
          hideHeader: true,
          message: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
          buttons: [
            {
              name: '메인으로',
              onClick: () => {
                navigate(path.ENTRY);
                closePopup();
              }
            }
          ]
        }
      })
    }
  }

  const openKeywordNoteDetailPopup = async (id: string, url: string, properties: any) => {
    openPopup({
      type: popupType.KEYWORD_NOTE_DETAIL,
      option: {
        url,
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
    <section className={styles.page}>
      {
        keywordNotes.map(({id, url, properties}: {id: string, url: string, properties: any}) => {
          return (
            <div key={id} className={styles.note} onClick={() => openKeywordNoteDetailPopup(id, url, properties)}>
              <p className={`${styles.noteTitle} ${textStyles.xl}`}>
                {properties.title.title[0].plain_text}
              </p>
              <div className={styles.noteBody}>
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
