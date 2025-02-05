"use client";

import type { MouseEventHandler } from "react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "use-context-selector";
import { useTranslation } from "react-i18next";
import Uploader from "./uploader";
import Button from "@/app/components/base/button";
import Modal from "@/app/components/base/modal";
import { ToastContext } from "@/app/components/base/toast";
import { importApp } from "@/service/apps";
import { useAppContext } from "@/context/app-context";
import { useProviderContext } from "@/context/provider-context";
import AppsFull from "@/app/components/billing/apps-full-in-dialog";
import { XClose } from "@/app/components/base/icons/src/vender/line/general";
import { NEED_REFRESH_APP_LIST_KEY } from "@/config";
import { getRedirection } from "@/utils/app-redirection";
import DSLFileList from "./DslFileList";
<<<<<<< HEAD
import { getDarkThemeClasses } from '@/app/theme'

=======
import { getDarkThemeClasses } from "@/utils/theme";
>>>>>>> origin/rupa
type CreateFromDSLModalProps = {
  show: boolean;
  onSuccess?: () => void;
  onClose: () => void;
};

const CreateFromDSLModal = ({
  show,
  onSuccess,
  onClose,
}: CreateFromDSLModalProps) => {
  const { push } = useRouter();
  const { t } = useTranslation();
  const { notify } = useContext(ToastContext);
  const [currentFile, setDSLFile] = useState<File>();
  const [fileContent, setFileContent] = useState<string>();
  const [activeTab, setActiveTab] = useState(0);

  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const content = event.target?.result;
      setFileContent(content as string);
    };
    reader.readAsText(file);
  };

  const handleFile = (file?: File) => {
    setDSLFile(file);
    if (file) readFile(file);
    if (!file) setFileContent("");
  };

  const { isCurrentWorkspaceEditor } = useAppContext();
  const { plan, enableBilling } = useProviderContext();
  const isAppsFull =
    enableBilling && plan.usage.buildApps >= plan.total.buildApps;

  const isCreatingRef = useRef(false);
  const onCreate: MouseEventHandler = async () => {
    if (isCreatingRef.current) return;
    isCreatingRef.current = true;
    if (!currentFile) return;
    try {
      const app = await importApp({
        data: fileContent || "",
      });
      if (onSuccess) onSuccess();
      if (onClose) onClose();
      notify({ type: "success", message: t("app.newApp.appCreated") });
      localStorage.setItem(NEED_REFRESH_APP_LIST_KEY, "1");
      getRedirection(isCurrentWorkspaceEditor, app, push);
    } catch (e) {
      notify({ type: "error", message: t("app.newApp.appCreateFailed") });
    }
    isCreatingRef.current = false;
  };
  const handleFileContent = (content: string) => {
    setFileContent(content);
  };
  return (
    <Modal
      wrapperClassName="z-20"
      // className='px-8 py-6 max-w-[520px] w-[520px] rounded-xl'
<<<<<<< HEAD
      className={`px-8 py-6 max-w-[520px] w-[520px] rounded-xl ${getDarkThemeClasses('background')} dark:shadow-slate-700 dark:shadow-sm`}
=======
      // className="px-8 py-6 max-w-[520px] w-[520px] rounded-xl dark:bg-[#202020] dark:shadow-slate-700 dark:shadow-sm"
      className={`px-8 py-6 max-w-[520px] w-[520px] rounded-xl ${getDarkThemeClasses('main_background')}
 ${getDarkThemeClasses('shadow1')} shadow-sm`}

>>>>>>> origin/rupa
      isShow={show}
      onClose={() => {}}
    >
      {/* <div className='relative pb-2 text-xl font-medium leading-[30px] text-gray-900'>{t('app.createFromConfigFile')}</div> */}

      <div
        className="absolute right-4 top-4 p-2 cursor-pointer"
        onClick={onClose}
      >
        {/* <XClose className='w-4 h-4 text-gray-500' /> */}
<<<<<<< HEAD
        <XClose className="w-4 h-4 text-gray-500 dark:text-white" />
=======
        <XClose className={`w-4 h-4 text-gray-500 ${getDarkThemeClasses('text')} `} />
>>>>>>> origin/rupa
      </div>
      {/* Tabs Section */}
      <div className="flex space-x-4 ">
        <button
          // className={`text-sm font-medium ${activeTab === 0 ? 'border-b-2 border-[#b7e724]' : 'text-gray-700 hover:text-[#b7e724] hover:border-b-2 hover:border-[#b7e724]'} transition-all`}
          className={`text-sm font-medium ${
            activeTab === 0
<<<<<<< HEAD
              ? "border-b-2 border-[#b7e724] dark:text-white"
              : "text-gray-700 dark:text-[#A1A2B6] hover:text-[#b7e724] hover:border-b-2 hover:border-[#b7e724] dark:hover:text-[#b7e724]"
=======
              ? `border-b-2 border-[#b7e724] ${getDarkThemeClasses('text')}
`
              : `text-gray-700 ${getDarkThemeClasses('sub_text3')} hover:text-[#b7e724] hover:border-b-2 hover:border-[#b7e724] ${getDarkThemeClasses('texthover')}`
>>>>>>> origin/rupa
          } transition-all`}
          onClick={() => setActiveTab(0)}
        >
          Uploader
        </button>
        <button
          // className={`text-sm font-medium ${activeTab === 1 ? ' border-b-2 border-[#b7e724]' : 'text-gray-700 hover:text-[#b7e724] hover:border-b-2 hover:border-[#b7e724]'} transition-all`}
          className={`text-sm font-medium ${
            activeTab === 1
<<<<<<< HEAD
              ? " border-b-2 border-[#b7e724] dark:text-white"
              : "text-gray-700 dark:text-[#A1A2B6] hover:text-[#b7e724] hover:border-b-2 hover:border-[#b7e724] dark:hover:text-[#b7e724]"
=======
              ? `border-b-2 border-[#b7e724] ${getDarkThemeClasses('text')}`
              : `text-gray-700 ${getDarkThemeClasses('sub_text3')} hover:text-[#b7e724] hover:border-b-2 hover:border-[#b7e724] ${getDarkThemeClasses('texthover')}`
>>>>>>> origin/rupa
          } transition-all`}
          onClick={() => setActiveTab(1)}
        >
          DSL File
        </button>
      </div>

      {/* Tab Content */}
      <div className="pt-4">
        {activeTab === 0 && (
          <div>
<<<<<<< HEAD
            <div className="relative pb-2 text-xl font-medium leading-[30px] text-gray-900 dark:text-white">
=======
            <div className={`relative pb-2 text-xl font-medium leading-[30px] text-gray-900 ${getDarkThemeClasses('text')}`}>
>>>>>>> origin/rupa
              Upload File to Create App
            </div>
            <Uploader file={currentFile} updateFile={handleFile} />
            {isAppsFull && <AppsFull loc="app-create-dsl" />}
            <div className="pt-6 flex justify-end">
              {/* <Button className='mr-2 text-gray-700 text-sm font-medium' onClick={onClose}>{t('app.newApp.Cancel')}</Button> */}
              <Button
<<<<<<< HEAD
                className="mr-2 text-gray-700 text-sm font-medium dark:bg-[#333333] dark:text-white dark:border-[#5F5F5F] dark:hover:bg-zinc-800"
                onClick={onClose}
              >
                {t("app.newApp.Cancel")}
              </Button>
=======
  className={`mr-2 text-gray-700 text-sm font-medium ${getDarkThemeClasses('background1')} ${getDarkThemeClasses('text')} ${getDarkThemeClasses('border')} ${getDarkThemeClasses('hover')}`}
  onClick={onClose}
>
  {t("app.newApp.Cancel")}
</Button>

>>>>>>> origin/rupa
              <Button
                className="text-sm font-medium"
                disabled={isAppsFull || !currentFile}
                type="primary"
                onClick={onCreate}
              >
                {t("app.newApp.Create")}
              </Button>
            </div>
          </div>
        )}
        {activeTab === 1 && <DSLFileList onSelectFile={handleFileContent} />}
      </div>
    </Modal>
  );
};

export default CreateFromDSLModal;
<<<<<<< HEAD

=======
>>>>>>> origin/rupa
