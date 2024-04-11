
export const Loader = ({loading, color='primary'}: {loading: boolean, color?: string}) => {
    return (
        <div
            className={`fixed top-0 left-0 bottom-0 right-0 w-full h-full z-50 overflow-hidden ${loading ? 'block' : 'hidden'}`}>
            <div className="max-w-full flex justify-center items-center h-full w-full bg-black bg-opacity-50">
                <div
                    className={`max-w-full animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-${color}-500`}></div>
            </div>
        </div>
    );
}