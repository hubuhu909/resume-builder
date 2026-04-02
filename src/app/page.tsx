'use client';

import { useState } from 'react';
import {
  AppState, defaultResumeData, defaultConfig,
} from '@/types/resume';
import ProgressBar from '@/components/ProgressBar';
import ChatBox from '@/components/ChatBox';
import Screen1Welcome from '@/components/Screen1Welcome';
import Screen2Style from '@/components/Screen2Style';
import Screen3JobType from '@/components/Screen3JobType';
import Screen4Info from '@/components/Screen4Info';
import Screen5AIBuild from '@/components/Screen5AIBuild';
import Screen6Download from '@/components/Screen6Download';

const TOTAL_SCREENS = 6;

export default function Home() {
  const [state, setState] = useState<AppState>({
    currentScreen: 0,
    resumeData: defaultResumeData,
    config: defaultConfig,
    generatedResume: '',
    generatedCoverLetter: '',
  });

  const goTo = (screen: number) => {
    setState(prev => ({ ...prev, currentScreen: screen }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateResumeData = (data: AppState['resumeData']) => {
    setState(prev => ({ ...prev, resumeData: data }));
  };

  const updateConfig = (config: AppState['config']) => {
    setState(prev => ({ ...prev, config }));
  };

  const restart = () => {
    setState({
      currentScreen: 0,
      resumeData: defaultResumeData,
      config: defaultConfig,
      generatedResume: '',
      generatedCoverLetter: '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <ProgressBar currentScreen={state.currentScreen} totalScreens={TOTAL_SCREENS} />

      <div style={{ paddingTop: state.currentScreen > 0 ? '60px' : '0' }}>
        {state.currentScreen === 0 && (
          <Screen1Welcome onNext={() => goTo(1)} />
        )}

        {state.currentScreen === 1 && (
          <Screen2Style
            config={state.config}
            onChange={updateConfig}
            onNext={() => goTo(2)}
            onBack={() => goTo(0)}
          />
        )}

        {state.currentScreen === 2 && (
          <Screen3JobType
            config={state.config}
            onChange={updateConfig}
            onNext={() => goTo(3)}
            onBack={() => goTo(1)}
          />
        )}

        {state.currentScreen === 3 && (
          <Screen4Info
            data={state.resumeData}
            onChange={updateResumeData}
            onNext={() => goTo(4)}
            onBack={() => goTo(2)}
          />
        )}

        {state.currentScreen === 4 && (
          <Screen5AIBuild
            data={state.resumeData}
            config={state.config}
            generatedResume={state.generatedResume}
            generatedCoverLetter={state.generatedCoverLetter}
            onResumeChange={html => setState(prev => ({ ...prev, generatedResume: html }))}
            onNext={() => goTo(5)}
            onBack={() => goTo(3)}
          />
        )}

        {state.currentScreen === 5 && (
          <Screen6Download
            data={state.resumeData}
            config={state.config}
            generatedResume={state.generatedResume}
            onRestart={restart}
          />
        )}
      </div>

      {/* AI Chatbox - always visible except screen 0 */}
      {state.currentScreen > 0 && (
        <ChatBox
          resumeData={state.resumeData}
          config={state.config}
          currentScreen={state.currentScreen}
        />
      )}
    </>
  );
}
