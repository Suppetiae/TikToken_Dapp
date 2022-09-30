import { useModal } from '@/components/modal-views/context';
import Input from '@/components/ui/forms/input';
import { useState, useEffect } from 'react';

export default function DisconTik({ ...props }) {
  const { closeModal } = useModal();
  const [value, setValue] = useState({
    name: '',
    mobile: '',
  });

  useEffect(() => {
    //you need to call this for nextjs, so this is performed only on client side.
    if (typeof window !== 'undefined') {
      let storedValue = localStorage.getItem('value');
      if (storedValue) {
        storedValue = JSON.parse(storedValue) || {};
        // we explicitly get name and mobile value in case localStorage was manually modified.
        const name = storedValue.name || '';
        const mobile = storedValue.mobile || '';
        setValue({ name, mobile }); //restore value from localStorage
      }
    }
  }, []);

  const onClear = () => {
    localStorage.removeItem('value');
  };

  const my_func = () => {
    onClear();
    closeModal();
  };

  return (
    <div
      className="relative z-50 mx-auto w-[440px] max-w-full rounded-lg bg-white px-9 py-16 dark:bg-light-dark"
      {...props}
    >
      <h2 className="mb-4 text-center text-2xl font-medium uppercase text-gray-900 dark:text-white">
        DisConnect TikTok
      </h2>
      <p className="text-center text-sm leading-loose tracking-tight text-gray-600 dark:text-gray-400">
        {value.name}
      </p>

      <div className="mt-12 flex h-14 w-full cursor-pointer items-center justify-center rounded-lg bg-gradient-to-l from-[#adcc24] to-[#aa2c03] px-4 text-center text-base text-white transition-all hover:-translate-y-0.5">
        <span
          className="flex items-center justify-center text-center"
          onClick={my_func}
        >
          DisConnect TikTok
        </span>
      </div>
    </div>
  );
}
