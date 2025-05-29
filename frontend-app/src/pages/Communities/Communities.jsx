import React from 'react';
import ContentContainer from '../../components/common/ContentContainer/ContentContainer';
import './Communities.css';

const Communities = () => {
  const communitiesData = [
    {
      id: 1,
      category: 'Урфу',
      telegramLink: '@urfu_ru',
      vkLink: 'vk.com/ural.federal.university',
    },
    {
      id: 2,
      category: 'ИРИТ-РТФ | УрФУ',
      telegramLink: '@rtf_urfu',
      vkLink: 'vk.com/irit_rtf_urfu',
    },
    {
      id: 3,
      category: 'Союз студентов | УрФУ',
      siteLink: 'https://posurfu.ru/',
      vkLink: 'vk.com/posnews',
    },
    {
      id: 4,
      category: 'Союз студентов | ИРИТ-РТФ ',
      telegramLink: '@rtf_urfu',
      vkLink: 'vk.com/irit_rtf',
    },
    {
      id: 5,
      category: 'Первый курс ИОТ, УрФУ',
      vkLink: 'vk.com/iot_first_urfu',
    },
    {
      id: 6,
      category: 'Второй курс ИОТ, УрФУ',
      vkLink: 'vk.com/iot_second_urfu',
    },
    {
      id: 7,
      category: 'Третий курс ИОТ, УрФУ',
      vkLink: 'vk.com/iot_third_urfu',
    },
    {
      id: 8,
      category: 'Четвертый курс ИОТ, УрФУ',
      vkLink: 'vk.com/iot_fourth',
    },
  ];

  const handleLinkClick = (link) => {
    const url = link.startsWith('http') ? link : `https://${link}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <ContentContainer title="Сообщества для студентов">
      <div className="communities-grid">
        {communitiesData.map((community) => (
          <div key={community.id} className="community-card">
            <div className="community-category">{community.category}</div>
            <div className="community-links">
              {community.siteLink && (
                <div
                  className="community-link"
                  onClick={() => handleLinkClick(community.siteLink)}
                >
                  <img
                    src="/svg/link.svg"
                    alt="Website"
                    className="link-icon site-icon"
                  />
                  {community.siteLink}
                </div>
              )}
              {community.vkLink && (
                <div
                  className="community-link"
                  onClick={() => handleLinkClick(community.vkLink)}
                >
                  <img
                    src="/img/vk.png"
                    alt="VK"
                    className="link-icon vk-icon"
                  />
                  {community.vkLink}
                </div>
              )}
              {community.telegramLink && (
                <div
                  className="community-link"
                  onClick={() =>
                    handleLinkClick(
                      `t.me/${community.telegramLink.replace('@', '')}`
                    )
                  }
                >
                  <img
                    src="/img/tg.png"
                    alt="Telegram"
                    className="link-icon tg-icon"
                  />
                  {community.telegramLink}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </ContentContainer>
  );
};

export default Communities;
