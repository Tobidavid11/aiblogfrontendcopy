import React, { useState, useEffect } from "react";
import { X, ChevronDown, CirclePlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

type Action = "Follow" | "Like" | "Comment" | "Share";

interface SocialItem {
  url: string;
  actions: Action[];
}

interface SocialActionsProps {
  onEmpty: () => void;
}

const SocialActions: React.FC<SocialActionsProps> = ({ onEmpty }) => {
  const [socialItems, setSocialItems] = useState<SocialItem[]>([
    { url: "", actions: [] },
  ]);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  useEffect(() => {
    if (socialItems.length === 0) {
      onEmpty();
    }
  }, [socialItems, onEmpty]);

  const addSocialItem = () => {
    setSocialItems([...socialItems, { url: "", actions: [] }]);
  };

  const removeSocialItem = (index: number) => {
    const newItems = socialItems.filter((_, i) => i !== index);
    setSocialItems(newItems);
  };

  const updateUrl = (index: number, url: string) => {
    const newItems = [...socialItems];
    newItems[index].url = url;
    setSocialItems(newItems);
  };

  const toggleAction = (index: number, action: Action) => {
    const newItems = [...socialItems];
    const actionIndex = newItems[index].actions.indexOf(action);
    if (actionIndex > -1) {
      newItems[index].actions = newItems[index].actions.filter(
        (a) => a !== action
      );
    } else {
      newItems[index].actions.push(action);
    }
    setSocialItems(newItems);
  };

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <>
      <Card className='bg-white rounded-xl h-full'>
        <CardContent>
          <div className='mt-10'>
            {socialItems.map((item, index) => (
              <div key={index} className='flex flex-col space-y-2'>
                <div className='flex space-x-2'>
                  <Button
                    variant='ghost'
                    onClick={() => removeSocialItem(index)}
                  >
                    <X className='h-4 w-4' />
                  </Button>
                  <div className='w-full border-b-2 border-gray-300 focus-within:border-blue-500'>
                    <Input
                      placeholder='Enter your profile link'
                      value={item.url}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateUrl(index, e.target.value)
                      }
                      className='w-full border-none focus:ring-0 shadow-none'
                    />
                  </div>

                  <div className='relative inline-block'>
                    <Button
                      variant='outline'
                      onClick={() => toggleDropdown(index)}
                      className='rounded-xl flex items-center justify-between'
                    >
                      Select action
                      <ChevronDown className='ml-2 h-4 w-4' />
                    </Button>
                    {openDropdown === index && (
                      <div className='absolute z-10 w-48 py-2 mt-2 bg-white rounded-md shadow-xl'>
                        {(
                          ["Follow", "Like", "Comment", "Share"] as Action[]
                        ).map((action) => (
                          <Label
                            key={action}
                            className='flex items-center px-4 py-2 hover:bg-gray-100'
                          >
                            <input
                              type='checkbox'
                              name=''
                              id=''
                              checked={item.actions.includes(action)}
                              onChange={() => toggleAction(index, action)}
                            />
                            <span className='ml-2'>{action}</span>
                          </Label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className='flex flex-wrap justify-end gap-2'>
                  {item.actions.map((action) => (
                    <span
                      key={action}
                      className='px-2 py-1 bg-[#F5F5F5] rounded-full text-sm my-3'
                    >
                      {action}{" "}
                      <X
                        className='h-3 w-3 inline cursor-pointer'
                        onClick={() => toggleAction(index, action)}
                      />
                    </span>
                  ))}
                </div>
              </div>
            ))}

            <div className='border-2 w-full h-0 my-5'></div>

            <div className='flex justify-between'>
              <div className=''>
                <Button
                  onClick={addSocialItem}
                  variant='outline'
                  className='border-none'
                >
                  <CirclePlus size={18} className='h-4 w-4 mr-2' /> Add more
                </Button>
              </div>

              <div className=''>
                <Trash2 />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default SocialActions;
