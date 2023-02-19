import React, { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { usePopupStore } from 'stores/usePopupStore';
import * as keywordNoteClient from 'apis/keywordNote';
import Spinner from 'components/common/Spinner';
import Tag from 'components/common/Tag';
import { betweenNumber } from 'utils/common';
import useLoading from 'hooks/useLoading';
import { BsLink } from 'react-icons/bs';
import styles from './KeywordNoteDetailPopup.module.css';
import textStyles from 'styles/Text.module.css';
import Button from 'components/common/Button';

const KEYWORD = 'Keyword';
const OUTPUT_GUIDE = 'Output Guide';
const REFERENCE_LINKS = 'Reference Links';

export default function KeywordNoteDetailPopup() {
  const { getOption, closePopup } = usePopupStore();
  const {
    url,
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
      'reviewCnt': { number: reviewCnt + 1, },
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

  return (
    <div className={styles.popup}>
      {loading && <Spinner />}
      {!loading && keywordNoteDetail && (
        <React.Fragment>
          <div className={styles.info}>
            {/* 
                @see
                https://stackoverflow.com/questions/50709625/link-with-target-blank-and-rel-noopener-noreferrer-still-vulnerable
              */}
            <a href={url} target='_blank' rel="noopener noreferrer" className={`${textStyles.xl2} ${styles.noteLink}`}>
              <BsLink />
            </a>
            <Tag tag={{
              id: 'topic',
              name: `[주제] ${topic}`,
              color: '#3b82f6',
            }} size='small' />
            <Tag tag={{
              id: 'topic',
              name: `[난이도] ${difficulty}`,
              color: '#f59e0b',
            }} size='small' />
            <Tag tag={{
              id: 'topic',
              name: `[복습 횟수] ${reviewCnt}`,
              color: '#10b981',
            }} size='small' />
            <Tag tag={{
              id: 'topic',
              name: `[최근 복습 일자] ${lastReviewDate}`,
              color: '#03a9f4',
            }} size='small' />
          </div>
          <div className={styles.noteSection}>
            <p className={`${styles.noteSectionTitle} ${textStyles.xl}`}># Keyword</p>
            {(keywordNoteDetail[KEYWORD] as any).children.map((child: any) => <NotionBlock key={child.id} node={child} />)}
          </div>
          <div className={styles.noteSection}>
            <p className={`${styles.noteSectionTitle} ${textStyles.xl}`}># Output Guide</p>
            {(keywordNoteDetail[OUTPUT_GUIDE] as any).children.map((child: any) => <NotionBlock key={child.id} node={child} />)}
          </div>
          <div className={styles.noteSection}>
            <p className={`${styles.noteSectionTitle} ${textStyles.xl}`}># Reference Links</p>
            {(keywordNoteDetail[REFERENCE_LINKS] as any).children.map((child: any) => <NotionBlock key={child.id} node={child} type='link' />)}
          </div>
          <div>
            <p className={styles.reviewDateSelectionMessage}>재복습 일정 선택</p>
            <ul className={`${styles.reviewDateItemList} ${textStyles.sm}`}>
              <li className={styles.reviewDateItem}>
                <div className={styles.reviewDateWrapper}>
                  <input
                    id="horizontal-list-radio-nextReviewInterval1"
                    type="radio"
                    name="list-radio"
                    className={styles.reviewDateInput}
                    onChange={() => { setNextReviewDayInterval(nextReviewDayIntervals![0]) }}
                  />
                  <label
                    htmlFor="horizontal-list-radio-nextReviewInterval1"
                    className={`${textStyles.sm} ${styles.reviewDateLabel}`}>
                    {nextReviewDayIntervals![0]}일 이후
                  </label>
                </div>
              </li>
              <li className={styles.reviewDateItem}>
                <div className={styles.reviewDateWrapper}>
                  <input
                    id="horizontal-list-radio-nextReviewInterval2"
                    type="radio"
                    name="list-radio"
                    className={styles.reviewDateInput}
                    onChange={() => { setNextReviewDayInterval(nextReviewDayIntervals![1]) }}
                  />
                  <label
                    htmlFor="horizontal-list-radio-nextReviewInterval2"
                    className={`${textStyles.sm} ${styles.reviewDateLabel}`}>
                    {nextReviewDayIntervals![1]}일 이후
                  </label>
                </div>
              </li>
              <li className={styles.reviewDateItem}>
                <div className={styles.reviewDateWrapper}>
                  <input
                    id="horizontal-list-radio-nextReviewInterval3"
                    type="radio"
                    name="list-radio"
                    className={styles.reviewDateInput}
                    onChange={() => { setNextReviewDayInterval(nextReviewDayIntervals![2]) }}
                  />
                  <label
                    htmlFor="horizontal-list-radio-nextReviewInterval3"
                    className={`${textStyles.sm} ${styles.reviewDateLabel}`}>
                    {nextReviewDayIntervals![2]}일 이후
                  </label>
                </div>
              </li>
              <li className={styles.reviewDateItem}>
                <div className={styles.reviewDateWrapper}>
                  <input
                    id="horizontal-list-radio-nextReviewInterval4"
                    type="radio"
                    name="list-radio"
                    className={styles.reviewDateInput}
                    onChange={() => { setNextReviewDayInterval(nextReviewDayIntervals![3]) }}
                  />
                  <label
                    htmlFor="horizontal-list-radio-nextReviewInterval4"
                    className={`${textStyles.sm} ${styles.reviewDateLabel}`}>
                    {nextReviewDayIntervals![3]}일 이후
                  </label>
                </div>
              </li>
            </ul>
            {
              nextReviewDayInterval && (
                <div className={styles.buttonReviewCompleteContainer}>
                  {/* <button
                      className={`${styles.buttonReviewComplete} ${textStyles.sm}`}
                      onClick={completeReview}
                    >복습 완료</button> */}
                  <Button onClick={completeReview}>복습 완료</Button>
                </div>
              )
            }
          </div>
        </React.Fragment>
      )}
    </div>
  )
}


/**
 * @see https://naveenda.medium.com/how-to-recursively-render-the-react-component-a821b3532894
 */
function NotionBlock({ node, type = 'text' }: any) {
  return (
    <ul className={styles.notionBlock}>
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