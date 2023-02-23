import { MouseEventHandler } from 'react';
import { EVENTS, TARGET } from './const';

interface LinkProps {
	target?: string;
	to: string;
	children: React.ReactNode;
	rest?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}
function navigate(href: string): void {
	window.history.pushState({}, '', href);
	//customEvent
	const navigateEvent = new Event(EVENTS.PUSTSTATE);
	window.dispatchEvent(navigateEvent);
}

function Link({ target, to, children, ...rest }: LinkProps) {
	const handleClick: MouseEventHandler<HTMLAnchorElement> = e => {
		const isModifiedEvent =
			e.metaKey || e.altKey || e.ctrlKey || e.shiftKey;

		const isCorrectClickEvent = e.button === 0;
		const isManageableEvent =
			target === undefined || target === TARGET.SELF;

		if (
			!isModifiedEvent &&
			isCorrectClickEvent &&
			isManageableEvent
		) {
			e.preventDefault();
			navigate(to);
		}
	};
	return (
		<a href={to} onClick={handleClick} {...rest}>
			{children}
		</a>
	);
}

export default Link;
