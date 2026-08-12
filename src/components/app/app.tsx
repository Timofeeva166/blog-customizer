import { CSSProperties, useEffect, useState, useRef } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	//состояние статьи
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	//открыта ли панелька
	const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
	//элемент панельки
	const panelRef = useRef<HTMLElement>(null);
	//див-обертка для кнопки закрытия
	const arrowButtonRef = useRef<HTMLDivElement>(null);

	//меняем состояние статьи при применении настроек
	const handleApply = (selectedState: ArticleStateType) => {
		setArticleState(selectedState);
	};

	//сбрасываем состояние статьи
	const handleReset = () => {
		setArticleState(defaultArticleState);
	};

	//переключаем флаг панельки
	const handleToggleForm = () => {
		setIsPanelOpen(!isPanelOpen);
	};

	//по клику вне формы закрываем панельку
	useEffect(() => {
		const handleOutsideClick = (e: MouseEvent) => {
			if (
				panelRef.current &&
				isPanelOpen &&
				!panelRef.current.contains(e.target as Node) &&
				!arrowButtonRef.current?.contains(e.target as Node)
			) {
				setIsPanelOpen(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isPanelOpen]);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isPanelOpen}
				onApply={handleApply}
				onReset={handleReset}
				onToggleForm={handleToggleForm}
				arrowButtonRef={arrowButtonRef}
				ref={panelRef}
			/>
			<Article />
		</main>
	);
};
