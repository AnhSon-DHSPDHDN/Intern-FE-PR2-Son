import { useHistory } from 'react-router-dom';

export default function useCustomeHistory() {
	const history = useHistory();
	history.listen(() => window.scrollTo(0, 0));
	return history;
}
