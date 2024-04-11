'use client'

import React from "react";
import {InputField} from "@/components/shared/Inputs";
import {Loader} from "@/components/shared/Loader";

interface Response {
    question: string;
    answer: string;
}

const dummyResponse: Response = {
    question: "What is this website about?",
    answer: "This section of the website appears to be a list of demo websites created by MURAGEH (murageh.co.ke). It serves as a guide or treasure map to some demo websites that the creator has worked on."
};
const responses: Response[]
    = Array(10).fill(dummyResponse);

export default function Home() {
    const urlRef = React.useRef<HTMLInputElement | null>(null);
    const questionRef = React.useRef<HTMLInputElement | null>(null);
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);
    const submitQuestionRef = React.useRef<HTMLButtonElement | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [responses, setResponses] = React.useState<Response[]>([]);
    const [hasSubmittedWebsite, setHasSubmittedWebsite] = React.useState(false);

    const reset = () => {
        setLoading(false);
        setResponses([]);
        setHasSubmittedWebsite(false);
    }

    const submitUrl = () => {
        urlRef.current?.blur();
        setLoading(true);
        console.log(urlRef?.current?.value);
        setTimeout(() => {
            setLoading(false);
            setHasSubmittedWebsite(true);
        }, 5000);
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

    const submitQuestion = () => {
        questionRef.current?.blur();
        setLoading(true);
        console.log(questionRef?.current?.value);
        setTimeout(() => {
            setLoading(false);
            setResponses([...responses, {
                question: questionRef?.current?.value || "unknown question",
                answer: "This is a dummy answer to the question"
            }]);
            // clear the input field
            questionRef.current!.value = '';
            // scroll to the bottom of the div
            const lastElement = document.getElementById('lastQuestion');
            lastElement?.scrollIntoView({behavior: "smooth"});

            // focus on the input field
            questionRef.current?.focus();
        }, 2000);
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between px-24 py-10">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                </p>
                <div
                    className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                    <span className={`text-xs text-gray-400 dark:text-gray-500`}>
                        Web Gourmet - <span className="text-gray-500 dark:text-gray-400">Ask Me Anything</span>
                    </span>
                </div>
            </div>

            <div
                className={`relative flex flex-col ${hasSubmittedWebsite ? 'w-full' : 'w-8/12'} place-items-center justify-center items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[0]`}>
                <div className="w-full px-3 h-full ">
                    I will answer any question regarding&nbsp;
                    <code className="font-mono font-bold">any website of your choice</code>
                </div>
                <div className="flex w-full justify-center items-center">
                    <InputField
                        autoFocus
                        name="url"
                        type="search"
                        className="  w-full self-center p-4 text-left border border-gray-300 rounded-lg dark:border-neutral-800 dark:bg-zinc-800/30 dark:text-gray-100 md:w-8/12 lg:w-8/12"
                        placeholder="Enter a website URL"
                        ref={urlRef}
                        onKeyDown={handleKeyDown}
                        disabled={loading || hasSubmittedWebsite}
                    />
                    <button
                        ref={buttonRef}
                        onClick={
                            hasSubmittedWebsite ? reset : submitUrl
                        }
                        className="submit my-3 p-3 text-white bg-gradient-to-r from-primary to-secondary rounded-lg dark:from-neutral-700 dark:to-neutral-800 dark:bg-neutral-800/30 flex-grow hover:from-transparent hover:to-transparent hover:bg-secondary hover:text-black">
                        {
                            hasSubmittedWebsite ?
                                <span>Change&nbsp;Website&nbsp;URL&nbsp;&#x21bb;</span>
                                : <span>Go&rarr;</span>
                        }
                    </button>
                </div>
            </div>

            <div className="mb-32 grid text-center w-full">
                {
                    loading ? (
                        <Loader loading={loading}/>
                    ) : null
                }

                {/*  scrollable div that holds inner divs containing a question and answer.  */}
                {
                    hasSubmittedWebsite ?
                        (<div id="answersDiv" className="w-full h-96 overflow-y-auto flex flex-col">
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
                        </div>) : null
                }

                {/*  Input section to enter questions about a site  */}
                {
                    hasSubmittedWebsite ?
                        (<div className="w-full flex justify-center items-center mt-4">
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
                                onClick={submitQuestion}
                                className="submit my-3 p-3 text-white bg-gradient-to-r from-primary to-secondary rounded-lg dark:from-neutral-700 dark:to-neutral-800 dark:bg-neutral-800/30">
                                Ask&rarr;
                            </button>
                        </div>) : null
                }
            </div>
        </main>
    );
}
