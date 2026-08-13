import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';

import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { FormEvent, useState, useRef, useEffect } from 'react';
import { RadioGroup } from 'src/ui/radio-group';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	onApply: (selectedState: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	//статус формы
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	//открыта ли панелька
	const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
	//элемент панельки
	const panelRef = useRef<HTMLElement>(null);
	//див-обертка для кнопки закрытия
	const arrowButtonRef = useRef<HTMLDivElement>(null);

	//не перезагружаем форму при применении настроек
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onApply(formState);
	};

	//скидываем настройки и в сайдбаре, и в статье
	const handleReset = () => {
		setFormState(defaultArticleState);
		onReset();
	};

	//смена значений полей в форме
	const fieldsHandlers = {
		changeFontFamily: (selected: OptionType) => {
			setFormState((prev) => ({
				...prev,
				fontFamilyOption: selected,
			}));
		},

		changeFontSize: (selected: OptionType) => {
			setFormState((prev) => ({
				...prev,
				fontSizeOption: selected,
			}));
		},

		changeFontColor: (selected: OptionType) => {
			setFormState((prev) => ({
				...prev,
				fontColor: selected,
			}));
		},

		changeBackgroundColor: (selected: OptionType) => {
			setFormState((prev) => ({
				...prev,
				backgroundColor: selected,
			}));
		},

		changeContentWidth: (selected: OptionType) => {
			setFormState((prev) => ({
				...prev,
				contentWidth: selected,
			}));
		},
	};

	//по клику вне формы закрываем панельку
	useEffect(() => {
		const handleOutsideClick = (e: MouseEvent) => {
			if (isPanelOpen === false) return;
			else if (
				panelRef.current &&
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
		<>
			<div ref={arrowButtonRef}>
				<ArrowButton
					isOpen={isPanelOpen}
					onClick={() => setIsPanelOpen(!isPanelOpen)}
				/>
			</div>
			<aside
				ref={panelRef}
				className={clsx(
					styles.container,
					isPanelOpen && styles.container_open
				)}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.body}>
						<Text
							size={31}
							weight={800}
							uppercase={true}
							fontStyle='normal'
							align='left'
							family='open-sans'>
							Задайте параметры
						</Text>
						<Select
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={fieldsHandlers.changeFontFamily}
							title='Шрифт'
						/>
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={fieldsHandlers.changeFontSize}
							title='Размер шрифта'
						/>
						<Select
							selected={formState.fontColor}
							options={fontColors}
							onChange={fieldsHandlers.changeFontColor}
							title='Цвет шрифта'
						/>
						<Separator />
						<Select
							selected={formState.backgroundColor}
							options={backgroundColors}
							onChange={fieldsHandlers.changeBackgroundColor}
							title='Цвет фона'
						/>
						<Select
							selected={formState.contentWidth}
							options={contentWidthArr}
							onChange={fieldsHandlers.changeContentWidth}
							title='Ширина контента'
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={() => onApply(formState)}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
