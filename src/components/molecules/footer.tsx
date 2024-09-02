const Footer = () => {
  return (
    <footer className="h-[218px] w-full bg-gray-900 py-9">
      <section className="mx-auto flex h-full w-[1152px] flex-col gap-4">
        <div className="flex gap-4">
          <a
            href={
              'https://teamsparta.notion.site/7b1dc644460946f08bab08b794de685f'
            }
            target="_blank"
            className="text-sm font-bold text-gray-600"
          >
            개인정보처리방침
          </a>
          <a
            href="https://teamsparta.notion.site/247d57da1322424d8e8c551df21a048e"
            target="_blank"
            className="text-sm font-medium text-gray-400"
          >
            서비스이용약관
          </a>
        </div>

        <div>
          <span className="text-sm font-medium text-gray-400">
            팀스파르타(주) 사업자 정보
          </span>
          <p className="text-sm font-medium text-gray-400">
            대표자 : 이범규ㅣ사업자 등록번호 : 783-86-01715ㅣ통신판매업 신고번호
            : 2020-서울강남-02300ㅣ평생교육시설 신고번호 : 제 661호
          </p>
          <p className="text-sm font-medium text-gray-400">
            주소 : 서울특별시 강남구 테헤란로44길 8 12층ㅣ이메일 :
            contact@teamsparta.coㅣ전화 : 1522-8016
          </p>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-400">
            Copyright ©2024 TEAMSPARTA. All rights reserved.
          </span>
        </div>
      </section>
    </footer>
  );
};
export default Footer;
