    Это руководство по оформлению кода написано с целью упорядочить и систематизировать подход к оформлению CSS кода.
***
1.	Свойства селектора упорядочиваются по группам*:
	+	Positioning
	+	Box model
	+	Typographic
	+	Visual
	+	Misc.

    *в случае псевдоэлемента первым свойством допускается писать content

	Подробнее о каждой группе:

	+	Positioning:
		-	position
		-	top | right | left | bottom
		-	z-index
	+	Box model:
		-	display | float | clear
		-	box-sizing
		-	width | height
		-	margin | padding | border-spacing
		-	min-width | min-height | max-width | max-height
	+	Typographic \(font\):
		-	font-style | font-variant | font-weight
		-	font-size
		-	line-height
		-	font-family
		-	color
		-	text-align | vertical-align | letter-spacing | white-space
		-	text-transform | text-decoration | text-shadow
	+	Visual:
		*	background \(background-attachment | background-color | background-image | background-position | background-repeat | background-size\)
		*	border \(border-width | border-style | border-color\) | outline
		*	border-radius
		*	box-shadow
		*	overflow | filter | opacity | visibility
		*	transform | transition
		*	list-style \(list-style-type | list-style-position | list-style-image\)
		*	resize
	+	Misc:
	    -	cursor
		-	pointer-events
		-	speak
		-	transition
		-	animation

2.	Порядок комментариев \(в СSS, JS\):
	+   Комментарий отделяющий разные несвязанные по смыслу фрагменты кода

		```
		/*--------------------*/
		```

	+	Комментарий отделяющий разные связанные по смыслу фрагменты кода

		```
		/*----------*/
		```

    +	Многострочные комментарии или названия отдельных разделов

		    /*
		    > this is new page
			*/

3.	Именование классов в стиле БЭМ:

		#!css

		.item__description {...}

		.item__price {...}
