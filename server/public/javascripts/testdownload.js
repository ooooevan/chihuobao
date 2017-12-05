const fs = require('fs')
const request = require('request')

request({
  url: 'http://f.wanfangdata.com.cn/Fulltext.ashx?fileId=Periodical_zhyxjy200202010&type=download&transaction=%7b%22ExtraData%22%3a%5b%5d%2c%22IsCache%22%3afalse%2c%22Transaction%22%3a%7b%22DateTime%22%3a%22%5c%2fDate(1512213259597%2b0800)%5c%2f%22%2c%22Id%22%3a%22e1fc302c-fd77-43c6-a772-a83d013d0b99%22%2c%22Memo%22%3anull%2c%22ProductDetail%22%3a%22Periodical_zhyxjy200202010%22%2c%22SessionId%22%3a%22f0efc45b-e77c-4f18-866a-0f12cbb3a866%22%2c%22Signature%22%3a%22kwU433%2b14fRgZPNwuThZgJCGXiCTLfUwooyNW%5c%2fYefNwAaqX5dSWVpg08SvyDcOZP%22%2c%22TransferIn%22%3a%7b%22AccountType%22%3a%22Income%22%2c%22Key%22%3a%22PeriodicalFulltext%22%7d%2c%22TransferOut%22%3a%7b%22AccountType%22%3a%22GTimeLimit%22%2c%22Key%22%3a%22gdhydx%22%7d%2c%22Turnover%22%3a3.00000%2c%22User%22%3anull%2c%22UserIP%22%3a%22125.90.48.97%22%7d%2c%22TransferOutAccountsStatus%22%3a%5b%5d%7d',
  method: 'GET',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
    'Host': 'docdownload.cnki.net',
    'Referer': 'http://kns.cnki.net/KCMS/detail/detail.aspx?dbcode=CJFQ&dbname=CJFD2013&filename=JYKQ201303016&uid=WEEvREcwSlJHSldRa1FhdXNXYXFuU2lNQk96MFhZSUUxc2hYS0MzUVE0cz0=$9A4hF_YAuvQ5obgVAqNKPCYcEjKensW4IQMovwHtwkF4VYPoHbKxJw!!&v=MjIyMDJUQWY3RzRIOUxNckk5RVlvUjhlWDFMdXhZUzdEaDFUM3FUcldNMUZyQ1VSTDJlWmVadEZ5RG1VTHpNTHo=',
    'Upgrade-Insecure-Requests': 1,
    'Cookie': 'ecp_uid5=5d54bba29c313af502e9001f56d24342; Ecp_notFirstLogin=m0Sqm6; Ecp_ClientId=3171114111802389971; RsPerPage=20; cnkiUserKey=60acc755-3ba6-d796-06bc-c115641a5ceb; ASP.NET_SessionId=rnze00bbirp1mhhyaazyst3e; SID_kns=123115; SID_klogin=125141; SID_crrs=125133; SID_krsnew=125133; SID_kcms=124120; SID_knsdelivery=125121; DisplaySave=1; Ecp_session=1; c_m_LinID=LinID=WEEvREcwSlJHSldRa1FhdXNXYXFuU2lNQk96MFhZSUUxc2hYS0MzUVE0cz0=$9A4hF_YAuvQ5obgVAqNKPCYcEjKensW4IQMovwHtwkF4VYPoHbKxJw!!&ot=12/02/2017 19:43:45; LID=WEEvREcwSlJHSldRa1FhdXNXYXFuU2lNQk96MFhZSUUxc2hYS0MzUVE0cz0=$9A4hF_YAuvQ5obgVAqNKPCYcEjKensW4IQMovwHtwkF4VYPoHbKxJw!!; c_m_expire=2017-12-02 19:43:45; Ecp_LoginStuts=%7B%22IsAutoLogin%22%3Afalse%2C%22UserName%22%3A%22GDZJHY%22%2C%22ShowName%22%3A%22%25E5%25B9%25BF%25E4%25B8%259C%25E6%25B5%25B7%25E6%25B4%258B%25E5%25A4%25A7%25E5%25AD%25A6%22%2C%22UserType%22%3A%22bk%22%2C%22r%22%3A%22m0Sqm6%22%7D'
  }
}).pipe(fs.createWriteStream('lunwen.pdf'))
