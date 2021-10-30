import React, { FC, useState } from 'react';
import { ReactComponent as ListIcon } from '../../../../assets/v2/svg/list.svg';
import { ReactComponent as ListFillIcon } from '../../../../assets/v2/svg/listfill.svg';
import { ReactComponent as TileIcon } from '../../../../assets/v2/svg/tile.svg';
import { ReactComponent as TileFillIcon } from '../../../../assets/v2/svg/tilefill.svg';
import * as S from './S.el';

interface FilterProps {
  activeFilter: 'active' | 'archived' | 'hold';
  setActiveFilter: (value: 'active' | 'archived' | 'hold') => void;
  buttons?: any[];
  withCustomButtons?: boolean;
  withoutViewType?: boolean;
  withoutContainer?: boolean;
  viewType?: string;
  setViewType?: (viewType: string) => void;
}

export const Filter: FC<FilterProps> = ({
  activeFilter,
  setActiveFilter,
  buttons,
  withCustomButtons,
  withoutViewType,
  withoutContainer,
  viewType,
  setViewType,
}: FilterProps) => {
  const handleActive = (type: string) => {
    if (type !== viewType) setViewType?.(type);
  };

  return (
    <S.Container without={withoutContainer}>
      <S.Buttons>
        {!withCustomButtons ? (
          <>
            <S.Button active={activeFilter === 'active'} onClick={() => setActiveFilter('active')}>
              Активные
            </S.Button>
            <S.Button active={activeFilter === 'hold'} onClick={() => setActiveFilter('hold')}>
              С отложенными выплатами
            </S.Button>
            <S.Button
              active={activeFilter === 'archived'}
              onClick={() => setActiveFilter('archived')}
            >
              В архиве
            </S.Button>
          </>
        ) : (
          <>
            {buttons &&
              buttons.map((button, idx) => (
                <S.Button
                  key={idx}
                  active={activeFilter === button.active}
                  onClick={() => setActiveFilter(button.active)}
                >
                  {button.text}
                </S.Button>
              ))}
          </>
        )}
      </S.Buttons>
      {!withoutViewType && (
        <S.FilterTypes>
          <S.FilterTypeList onClick={() => handleActive('list')}>
            {viewType === 'list' ? <ListFillIcon /> : <ListIcon />}
          </S.FilterTypeList>
          <S.FilterTypeTile onClick={() => handleActive('tile')}>
            {viewType === 'tile' ? <TileFillIcon /> : <TileIcon />}
          </S.FilterTypeTile>
        </S.FilterTypes>
      )}
    </S.Container>
  );
};
