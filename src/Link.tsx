import { MouseEventHandler } from 'react';

interface LinkProps {
	target?: string;
	to: string;
	children: React.ReactNode;
	props?: any;
}
function navigate(href: string) {
	window.history.pushState({}, '', href);
	//customEvent
	const navigateEvent = new Event('pushstate');
	window.dispatchEvent(navigateEvent);
}

function Link({ target, to, ...props }: LinkProps) {
	const handleClick: MouseEventHandler<HTMLAnchorElement> = e => {
		const isModifiedEvent =
			e.metaKey || e.altKey || e.ctrlKey || e.shiftKey;

		const isCorrectClickEvent = e.button === 0;
		const isManageableEvent =
			target === undefined || target === '_self';

		if (
			!isModifiedEvent &&
			isCorrectClickEvent &&
			isManageableEvent
		) {
			e.preventDefault();
			navigate(to);
		}
	};
	return <a href={to} onClick={handleClick} {...props} />;
}

export default Link;
