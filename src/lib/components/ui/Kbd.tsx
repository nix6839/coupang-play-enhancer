import { splitProps, type ComponentProps } from 'solid-js';

interface KbdProps extends ComponentProps<'kbd'> {}

export default function Kbd(props: KbdProps) {
	const [classProp, restProps] = splitProps(props, ['class']);

	return (
		<kbd
			class="inline-flex items-center text-sm py-[1px] px-1 bg-secondary text-secondary-foreground rounded-[0.25rem] shadow-sm shadow-muted"
			classList={{ [classProp.class ?? '']: classProp.class !== undefined }}
			{...restProps}
		/>
	);
}
