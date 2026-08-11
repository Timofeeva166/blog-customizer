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
import { FormEvent, useEffect, useState } from 'react';
import { RadioGroup } from 'src/ui/radio-group';

type ArticleParamsFormProps = {
	isOpen: boolean;
	onApply: (selectedState: ArticleStateType) => void;
	onReset: () => void;
	onToggleForm: () => void;
	currentState: ArticleStateType;
};

export const ArticleParamsForm = ({
	isOpen,
	onApply,
	onReset,
	onToggleForm,
	currentState,
}: ArticleParamsFormProps) => {
	const [formState, setFormState] = useState<ArticleStateType>(currentState);

	useEffect(() => {
		setFormState(currentState);
	}, [currentState]);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleApply();
	};

	const handleApply = () => {
		onApply(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onReset();
	};

	const fieldsHandlers = {
		fontFamily: (selected: OptionType) => {
			setFormState((prev) => ({
				...prev,
				fontFamilyOption: selected,
			}));
		},

		fontSize: (selected: OptionType) => {
			setFormState((prev) => ({
				...prev,
				fontSizeOption: selected,
			}));
		},

		fontColor: (selected: OptionType) => {
			setFormState((prev) => ({
				...prev,
				fontColor: selected,
			}));
		},

		backgroundColor: (selected: OptionType) => {
			setFormState((prev) => ({
				...prev,
				backgroundColor: selected,
			}));
		},

		contentWidth: (selected: OptionType) => {
			setFormState((prev) => ({
				...prev,
				contentWidth: selected,
			}));
		},
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggleForm} />
			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.body}>
						<Text
							size={31}
							weight={800}
							uppercase={true}
							fontStyle={'normal'}
							align={'left'}
							family={'open-sans'}>
							Задайте параметры
						</Text>
						<Select
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={fieldsHandlers.fontFamily}
							title='шрифт'
						/>
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={fieldsHandlers.fontSize}
							title='Размер шрифта'
						/>
						<Select
							selected={formState.fontColor}
							options={fontColors}
							onChange={fieldsHandlers.fontColor}
							title='Цвет шрифта'
						/>
						<Separator />
						<Select
							selected={formState.backgroundColor}
							options={backgroundColors}
							onChange={fieldsHandlers.backgroundColor}
							title='Цвет фона'
						/>
						<Select
							selected={formState.contentWidth}
							options={contentWidthArr}
							onChange={fieldsHandlers.contentWidth}
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
							onClick={handleApply}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
