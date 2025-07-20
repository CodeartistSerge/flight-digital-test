import styled from 'styled-components';

interface wrapperProps {
	children: React.ReactNode;
}

const Div = styled.div`
	display: block;
	overflow: hidden;
	width: 100%;
	position: relative;
  background: var(--color-canvas);
`;

export default function Wrapper({children}:wrapperProps) {

	return (
		<Div>
			{children}
		</Div>
	)
}