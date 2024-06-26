'use client'

import React from "react";
import {InputField} from "@/components/shared/Inputs";
import {Loader} from "@/components/shared/Loader";
import WithToastContainer from "@/HOCs/WithToastContainer";
import {submitQuestion, submitUrl} from "@/services";
import {toast} from "react-toastify";
import {WithRedux} from "@/HOCs/WithRedux";
import {useAppDispatch, useAppSelector} from '@/state/hooks';
import {addResponse, clearCurrentWebsite, clearResponses, setCurrentWebsite} from "@/state/features/websitesSlice";

function Home() {
    const urlRef = React.useRef<HTMLInputElement | null>(null);
    const questionRef = React.useRef<HTMLInputElement | null>(null);
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);
    const submitQuestionRef = React.useRef<HTMLButtonElement | null>(null);
    const [loading, setLoading] = React.useState(true);

    const {responses, currentWebsite} = useAppSelector((state) => state.responses);
    const dispatch = useAppDispatch();
    const hasSubmittedWebsite = !!currentWebsite;

    const reset = () => {
        setLoading(false);
        dispatch(clearResponses());
        dispatch(clearCurrentWebsite());
    }

    const handleSubmitUrl = async () => {
        urlRef.current?.blur();
        setLoading(true);
        const url = urlRef?.current?.value;
        // console.log({url});
        const response = await submitUrl(url);
        console.log({response});
        if (response.success) {
            dispatch(setCurrentWebsite(url || ''));
            toast.success('You can now ask me anything');
        } else {
            console.log('error', response.error);
            toast.error(response.error);
        }
        setLoading(false);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            buttonRef?.current?.click();
        }
    }

    const handleQuestionKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            submitQuestionRef?.current?.click();
        }
    }

    const handleSubmitQuestion = async () => {
        questionRef.current?.blur();
        setLoading(true);
        const url = urlRef?.current?.value;
        const question = questionRef?.current?.value;
        // console.log({question, url});

        if (!question) {
            toast.error('Please enter a question');
            return;
        }

        if (!url) {
            toast.error('Please enter a website URL');
            return;
        }

        const response = await submitQuestion(question, url);
        if (response.success) {
            dispatch(addResponse(
                {
                    question,
                    answer: response.data.message
                }
            ));
            // clear the input field
            questionRef.current!.value = '';
            // scroll to the bottom of the div
            const lastElement = document.getElementById('lastQuestion');
            lastElement?.scrollIntoView({behavior: "smooth"});
            // The following is a hack to ensure the element scrolls.
            // Let's scroll the parent to its end as well.
            // This bug is as a result of the CSS change.
            // Should be re-thought to avoid this.
            // But here we go...
            const parentElement = document.getElementById('answersDiv');
            parentElement?.scrollTo({top: parentElement.scrollHeight, behavior: "smooth"});
            // focus on the input field
            questionRef.current?.focus();
        } else {
            toast.error(response.error);
        }

        setLoading(false);
    }

    React.useEffect(() => {
        setLoading(false);

        if (hasSubmittedWebsite) {
            urlRef.current!.value = currentWebsite!;
        }
    }, [currentWebsite, hasSubmittedWebsite]);

    return (
        <main
            className="flex h-screen max-w-5xl mx-auto flex-col items-center justify-center gap-y-10 px-2 md:px-24 py-2 md:py-10">
            {
                loading ? (
                    <Loader loading={loading}/>
                ) : null
            }
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <p className="fixed left-0 top-0 hidden md:flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    Hi there.
                </p>
                <div
                    className="ml-auto py-2 flex items-end justify-center lg:static bg-none">
                    <span className={`text-xs text-gray-400 dark:text-gray-500`}>
                        Web Gourmet - <span className="text-gray-500 dark:text-gray-400">Ask Me Anything</span>
                    </span>
                </div>
            </div>

            <div
                className={`my-auto relative flex flex-col ${hasSubmittedWebsite ? 'w-full' : 'w-11/12 md:w-8/12'} place-items-center justify-center items-center self-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[0]`}>
                <div className="w-full px-3 h-full ">
                    I will answer any question regarding&nbsp;
                    <code className="font-mono font-bold">any website of your choice</code>
                </div>
                <div className="flex w-full flex-col md:flex-row justify-center items-center sticky">
                    <InputField
                        autoFocus
                        name="url"
                        type="search"
                        className=" w-full self-center p-4 text-left border border-gray-300 rounded-lg dark:border-neutral-800 dark:bg-zinc-800/30 dark:text-gray-100 md:w-8/12 lg:w-8/12"
                        placeholder="Enter a website URL"
                        ref={urlRef}
                        onKeyDown={handleKeyDown}
                        disabled={loading || hasSubmittedWebsite}
                    />
                    <button
                        ref={buttonRef}
                        onClick={
                            hasSubmittedWebsite ? reset : handleSubmitUrl
                        }
                        className="submit mx-3 md:mx-0 my-0 md:my-3 p-3 self-start md:self-center text-white bg-gradient-to-r from-primary to-secondary rounded-lg dark:from-neutral-700 dark:to-neutral-800 dark:bg-neutral-800/30 flex-grow hover:from-transparent hover:to-transparent hover:bg-secondary hover:text-black">
                        {
                            hasSubmittedWebsite ?
                                <span>Change&nbsp;Website&nbsp;URL&nbsp;&#x21bb;</span>
                                : <span>Go&rarr;</span>
                        }
                    </button>
                </div>
            </div>

            {
                hasSubmittedWebsite ? (
                    <div className="grid text-center w-full flex-grow overflow-y-auto">
                        {/*  scrollable div that holds inner divs containing a question and answer.  */}
                        <div id="answersDiv" className="w-full overflow-y-auto flex flex-col">
                            {
                                responses.length < 1 ? (
                                        <div
                                            className="flex flex-col p-4 border border-gray-300 dark:border-neutral-800 rounded self-center my-auto mx-auto">
                                            <div className="text-lg font-bold text-left">Ask me a question</div>
                                        </div>
                                    ) :
                                    responses.map((response, index) => (
                                        <div key={index}
                                             {...index === responses.length - 1 ? {id: 'lastQuestion'} : {}}
                                             className="flex flex-col p-4 my-2 border border-gray-300 dark:border-neutral-800 rounded">
                                            <div className="text-lg font-bold text-left">{response.question}</div>
                                            <div className="text-sm text-left">{response.answer}</div>
                                        </div>
                                    ))
                            }
                        </div>

                        {/*  Input section to enter questions about a site  */}
                        <div className="w-full flex justify-center items-center mt-4">
                            <InputField
                                ref={questionRef}
                                onKeyDown={handleQuestionKeyDown}
                                autoFocus
                                name="question"
                                type="text"
                                className="w-8/12 p-4 text-left border border-gray-300 rounded-lg dark:border-neutral-800 dark:bg-zinc-800/30 dark:text-gray-100"
                                placeholder={`Ask a question about ${urlRef.current?.value}`}
                            />
                            <button
                                ref={submitQuestionRef}
                                onClick={handleSubmitQuestion}
                                className="submit my-3 p-3 text-white bg-gradient-to-r from-primary to-secondary rounded-lg dark:from-neutral-700 dark:to-neutral-800 dark:bg-neutral-800/30">
                                Ask&rarr;
                            </button>
                        </div>
                    </div>
                ) : null}
        </main>
    );
}

export default function Homepage() {
    return (
        <WithRedux>
            <WithToastContainer>
                <Home/>
            </WithToastContainer>
        </WithRedux>
    );
}