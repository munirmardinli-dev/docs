'use client';

import { useEffect, useRef } from 'react';

function useSidebarAccordion() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const initAccordion = () => {
      const checkSidebar = () => {
        const sidebar = document.querySelector('[data-testid="sidebar"]') ||
          document.querySelector('nav[role="navigation"]') ||
          document.querySelector('.nextra-sidebar-container') ||
          document.querySelector('[class*="sidebar"]');

        if (!sidebar) {
          setTimeout(checkSidebar, 100);
          return;
        }

        initialized.current = true;
        sidebar.classList.add('sidebar-accordion');

        const closeOtherMenus = (exceptItem: Element | null) => {
          const allOpenMenus = sidebar.querySelectorAll('li.open, [data-headlessui-state="open"]');

          allOpenMenus.forEach((menuItem) => {
            if (menuItem !== exceptItem) {
              const submenu = menuItem.querySelector('div[style*="opacity"]') as HTMLElement;
              if (submenu) {
                submenu.style.transition = 'all 0.2s ease-out';

                setTimeout(() => {
                  submenu.style.opacity = '0';
                  submenu.style.maxHeight = '0';
                  submenu.style.overflow = 'hidden';
                  submenu.style.transform = 'translateY(-10px)';
                }, 50);

                setTimeout(() => {
                  menuItem.classList.remove('active');
                  submenu.style.transform = 'translateY(0)';
                }, 250);
              } else {
                menuItem.classList.remove('active');
              }
            }
          });
        };

        const openMenu = (menuItem: Element) => {
          menuItem.classList.add('active');
          const submenu = menuItem.querySelector('div[style*="opacity"]') as HTMLElement;
          if (submenu) {
            submenu.style.transition = 'all 0.3s ease-out';
            submenu.style.opacity = '1';
            submenu.style.maxHeight = '1000px';
            submenu.style.overflow = 'visible';
            submenu.style.transform = 'translateY(0)';
          }

          setTimeout(() => {
            closeOtherMenus(menuItem);
          }, 100);
        };

        const allOpenMenus = sidebar.querySelectorAll('li.open, [data-headlessui-state="open"]');
        if (allOpenMenus.length > 0) {
          allOpenMenus[0].classList.add('active');

          setTimeout(() => {
            closeOtherMenus(allOpenMenus[0]);
          }, 200);
        }

        const menuButtons = sidebar.querySelectorAll('li.open > button, li.open > a, [data-headlessui-state="open"] > button');

        menuButtons.forEach((button) => {
          const handleClick = (e: Event) => {
            const clickedItem = (e.target as HTMLElement).closest('li.open, [data-headlessui-state="open"]');
            if (clickedItem) {
              if (clickedItem.classList.contains('animating')) return;
              clickedItem.classList.add('animating');
              setTimeout(() => {
                clickedItem.classList.remove('animating');
              }, 500);

              openMenu(clickedItem);
            }
          };

          button.removeEventListener('click', handleClick);
          button.addEventListener('click', handleClick);
        });

        const handleNavigation = () => {
          const currentPath = window.location.pathname;

          allOpenMenus.forEach((menuItem) => {
            const links = menuItem.querySelectorAll('a');
            const hasCurrentPage = Array.from(links).some(link =>
              link.getAttribute('href') === currentPath
            );

            if (hasCurrentPage) {
              setTimeout(() => {
                openMenu(menuItem);
              }, 150);
            }
          });
        };

        setTimeout(handleNavigation, 300);

        let currentUrl = window.location.href;
        let navigationTimeout: NodeJS.Timeout;

        const observer = new MutationObserver(() => {
          if (window.location.href !== currentUrl) {
            currentUrl = window.location.href;
            clearTimeout(navigationTimeout);
            navigationTimeout = setTimeout(handleNavigation, 200);
          }
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true
        });

        return () => {
          observer.disconnect();
          clearTimeout(navigationTimeout);
          menuButtons.forEach(button => {
            button.removeEventListener('click', () => { });
          });
        };
      };

      checkSidebar();
    };

    initAccordion();
    const handlePopState = () => {
      initialized.current = false;
      setTimeout(initAccordion, 50);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
}

export function SidebarAccordion() {
  useSidebarAccordion();
  return null;
}
