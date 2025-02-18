"use client";
import type { FC } from "react";
import React, { useCallback, useRef, useState } from "react";
import copy from "copy-to-clipboard";
import cn from "classnames";
import Wrap from "./wrap";
import PromptEditorHeightResizeWrap from "@/app/components/app/configuration/config-prompt/prompt-editor-height-resize-wrap";
import {
  Clipboard,
  ClipboardCheck,
} from "@/app/components/base/icons/src/vender/line/files";
import ToggleExpandBtn from "@/app/components/workflow/nodes/_base/components/toggle-expand-btn";
import useToggleExpend from "@/app/components/workflow/nodes/_base/hooks/use-toggle-expend";

type Props = {
  className?: string;
  title: JSX.Element | string;
  headerRight?: JSX.Element;
  children: JSX.Element;
  minHeight?: number;
  value: string;
  isFocus: boolean;
  isInNode?: boolean;
};

const Base: FC<Props> = ({
  className,
  title,
  headerRight,
  children,
  minHeight = 120,
  value,
  isFocus,
  isInNode,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    wrapClassName,
    wrapStyle,
    isExpand,
    setIsExpand,
    editorExpandHeight,
  } = useToggleExpend({ ref, hasFooter: false, isInNode });

  const editorContentMinHeight = minHeight - 28;
  const [editorContentHeight, setEditorContentHeight] = useState(
    editorContentMinHeight
  );

  const [isCopied, setIsCopied] = React.useState(false);
  const handleCopy = useCallback(() => {
    copy(value);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }, [value]);

  return (
    <Wrap
      className={cn(wrapClassName)}
      style={wrapStyle}
      isInNode={isInNode}
      isExpand={isExpand}
    >
      {/* <div ref={ref} className={cn(className, isExpand && 'h-full', 'rounded-lg border', isFocus ? 'bg-white border-gray-200 overflow-hidden' : 'bg-gray-100 border-gray-100 overflow-hidden')}> */}
      <div
        ref={ref}
        className={cn(
          className,
          isExpand && "h-full",
          "rounded-lg border",
          isFocus
            ? "bg-white dark:bg-[#3e3e3e] border-gray-200 dark:border-[#5f5f5f] overflow-hidden"
            : "bg-gray-100 dark:!bg-[#2c2c2c] border-gray-100 dark:border-[#2c2c2c] overflow-hidden"
        )}
      >
        <div className="flex justify-between items-center h-7 pt-1 pl-3 pr-2">
          {/* <div className='text-xs font-semibold text-gray-700'>{title}</div> */}
          <div className="text-xs font-semibold text-gray-700 dark:text-[#FCFCFC]">
            {title}
          </div>
          <div
            className="flex items-center"
            onClick={(e) => {
              e.nativeEvent.stopImmediatePropagation();
              e.stopPropagation();
            }}
          >
            {headerRight}
            {!isCopied ? (
              <Clipboard
                className="mx-1 w-3.5 h-3.5 text-gray-500 cursor-pointer"
                onClick={handleCopy}
              />
            ) : (
              <ClipboardCheck className="mx-1 w-3.5 h-3.5 text-gray-500" />
            )}
            <div className="ml-1">
              <ToggleExpandBtn
                isExpand={isExpand}
                onExpandChange={setIsExpand}
              />
            </div>
          </div>
        </div>
        <PromptEditorHeightResizeWrap
          height={isExpand ? editorExpandHeight : editorContentHeight}
          minHeight={editorContentMinHeight}
          onHeightChange={setEditorContentHeight}
          hideResize={isExpand}
        >
          <div className="h-full pb-2">{children}</div>
        </PromptEditorHeightResizeWrap>
      </div>
    </Wrap>
  );
};
export default React.memo(Base);
